# Film Planning App — System Design

**Status:** Draft v0.1
**Date:** 2026-04-24
**Reference:** Previs Pro (previspro.com) — feature parity baseline
**Working dir:** `/Users/nickv/Film Planning App`

---

## 1. Requirements

### 1.1 Functional

| # | Capability | Notes |
|---|---|---|
| F1 | 3D scene building | Place/transform characters, props, lights, cameras on a virtual stage |
| F2 | Previs timeline | Multi-track editor: shots, audio, camera moves, character animation, scrubbable playback |
| F3 | Storyboard generation | Render frames per shot, panel layout, export-ready boards |
| F4 | Final Draft import | Parse `.fdx` screenplay → scenes/shots scaffold |
| F5 | AR virtual camera (iPhone/iPad) | Stream device pose into scene as live cam, record takes |
| F6 | LiDAR location scanning | Capture room/exterior mesh, import as scene backdrop |
| F7 | Director markup | Annotate frames (pen, shapes, text) over rendered storyboard |
| F8 | Export pipeline | MP4 animatics, PDF/PNG storyboards, CSV shot lists, FBX/USDZ scene |
| F9 | Project save/share | Bundle project; collaborator read-only links; iCloud sync across devices |
| F10 | Asset library | Built-in characters/props + AI-generated props + user uploads |

### 1.2 Non-Functional

- **Latency:** 60 fps viewport on M-series Mac, ≥30 fps on iPhone 13+
- **Scale:** 10–500 shots/project, asset library ~10K SKUs, scene mesh up to ~5M tris
- **Availability:** Local-first; cloud sync best-effort, never blocking
- **Storage:** Single project up to ~5 GB (LiDAR meshes, audio, exports)
- **Offline:** All core editing works without network; only AI-prop gen + share require connectivity
- **Privacy:** Screenplays and scans are sensitive IP — encrypted at rest, e2e for shared links

### 1.3 Constraints

- Apple ecosystem only (Mac/iPad/iPhone) — leverage shared Swift codebase
- Solo/small team build → favor Apple-native frameworks over custom engines
- Subscription via App Store (StoreKit 2) — no separate billing infra
- AI prop generation is third-party (treat as pluggable provider)

---

## 2. High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                       CLIENT (Mac / iPad / iPhone)               │
│                                                                  │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ SwiftUI UI  │  │ Timeline UI  │  │ Markup / Storyboard  │   │
│  │  (shared)   │  │  (Canvas)    │  │      (PencilKit)     │   │
│  └──────┬──────┘  └───────┬──────┘  └──────────┬───────────┘   │
│         │                 │                    │                │
│  ┌──────┴─────────────────┴────────────────────┴───────────┐   │
│  │              App State Layer (Observation)              │   │
│  │   ProjectStore · TimelineStore · SelectionStore         │   │
│  └──────┬───────────────────────┬───────────────────┬──────┘   │
│         │                       │                   │           │
│  ┌──────┴──────┐  ┌─────────────┴─────┐  ┌──────────┴───────┐  │
│  │ RealityKit  │  │  AVFoundation     │  │  ARKit + Scene   │  │
│  │  Renderer   │  │  Audio/Video      │  │  Reconstruction  │  │
│  │ (SceneKit   │  │  Pipeline         │  │  (LiDAR mesh)    │  │
│  │  fallback)  │  │                   │  │                  │  │
│  └──────┬──────┘  └─────────┬─────────┘  └────────┬─────────┘  │
│         │                   │                     │             │
│  ┌──────┴───────────────────┴─────────────────────┴──────────┐ │
│  │           Persistence (SwiftData + file bundle)           │ │
│  │   .filmproj package · Assets/ · Scans/ · Audio/ · Export/ │ │
│  └──────────────────────────┬───────────────────────────────┘ │
└──────────────────────────────┼───────────────────────────────────┘
                               │
                  ┌────────────┴────────────┐
                  │      CloudKit (Apple)   │  ← sync, sharing
                  │  Private DB · Shared DB │
                  └────────────┬────────────┘
                               │
       ┌───────────────────────┼─────────────────────────┐
       │                       │                         │
┌──────┴────────┐    ┌─────────┴─────────┐    ┌──────────┴────────┐
│ Asset CDN     │    │ AI Prop Service   │    │ Final Draft       │
│ (built-in     │    │ (OpenAI/Replicate │    │ Parser (.fdx)     │
│  prop catalog)│    │  via gateway)     │    │ — runs on-device  │
└───────────────┘    └───────────────────┘    └───────────────────┘
```

### 2.1 Component responsibilities

- **App State Layer** — single source of truth (Swift `@Observable`), drives all views and the renderer.
- **RealityKit Renderer** — primary 3D engine; SceneKit fallback for older OS. Renders the editable viewport and offline frames for storyboards/MP4.
- **AVFoundation Pipeline** — composes timeline → MP4: shot frames + audio tracks + transitions.
- **ARKit / Scene Reconstruction** — virtual camera (device pose → camera entity) and LiDAR `ARMeshAnchor` capture.
- **Persistence** — `.filmproj` document package (SwiftData store + flat asset folders). CloudKit mirrors project metadata; large blobs use `CKAsset`.

---

## 3. Data Model

Document is a **package** (NSFileWrapper / `UIDocument`-style bundle):

```
MyMovie.filmproj/
├── project.sqlite          ← SwiftData store (lightweight entities)
├── Assets/                 ← user uploads, AI-generated props
│   └── {asset-uuid}.usdz
├── Scans/                  ← LiDAR captures
│   └── {scan-uuid}.usdz
├── Audio/                  ← imported tracks, takes
│   └── {clip-uuid}.caf
├── Renders/                ← cached per-shot renders (regenerable)
│   └── {shot-uuid}.png
└── thumbnail.png
```

### 3.1 Entities (SwiftData)

```swift
@Model class Project { id, title, fps, resolution, createdAt, screenplayRef }
@Model class Sequence { id, project, index, title }     // act/sequence
@Model class Scene { id, sequence, slugline, location, timeOfDay }
@Model class Shot { id, scene, index, duration, cameraId, lensMM, notes }
@Model class StageEntity {                              // anything in 3D space
    id, scene, kind: .character|.prop|.light|.camera|.scan
    assetRef, transform, animationRef, parameters: JSON
}
@Model class TimelineTrack { id, project, kind: .video|.audio|.markup, lane }
@Model class TimelineClip { id, track, in, out, sourceRef }
@Model class Annotation { id, shot, frame, strokes: PencilKit.drawing }
@Model class Asset { id, kind, source: .builtin|.ai|.user, url, metadata }
```

**Why SwiftData:** native, observable, plays nice with CloudKit mirroring, decent perf for ~10K rows. **Trade-off:** schema migrations are still rough — pin to a versioned migration plan from day one.

### 3.2 Asset library

- Built-in catalog ships in app bundle as a manifest (`assets.json`) with thumbnails; full USDZ pulled lazily from CDN on first use.
- AI-generated props returned as USDZ from gateway, stored in `Assets/`.
- User uploads: drag-drop USDZ/glTF/OBJ → normalize to USDZ via `Model I/O`.

---

## 4. Rendering Pipeline

```
Edit-time:                    Export-time:
┌──────────────┐              ┌──────────────────────────┐
│ Scene Graph  │              │  Per-shot frame loop     │
│ (RealityKit) │              │  ──────────────────────  │
│              │              │  1. Seek timeline → t    │
│   ↓          │              │  2. Apply animations     │
│  ARView /    │              │  3. RealityKit offline   │
│  RealityView │              │     render → CVPixelBuf  │
│   ↓          │              │  4. AVAssetWriter        │
│  60 fps live │              │     append video sample  │
└──────────────┘              │  5. Mix audio tracks     │
                              │  6. Mux MP4              │
                              └──────────────────────────┘
```

- **Live viewport:** RealityKit `RealityView` (iOS 18+/macOS 15+). SceneKit shim for older OS — abstract behind `RenderEngine` protocol so we can swap.
- **Offline render:** Headless RealityKit using `ARView.snapshot`-style API on iOS or a Metal `MTLTexture` round-trip on Mac. Storyboards = single frame per shot; animatics = full timeline.
- **Why not custom Metal engine:** scope creep killer. RealityKit gives us PBR, animation, USDZ for free.

---

## 5. AR / LiDAR Integration

### 5.1 Virtual camera mode (iPhone/iPad)
- `ARWorldTrackingConfiguration` → device pose feeds a `Camera` entity
- "Record" captures pose samples + (optional) video pass-through at 60 Hz → stored as a `CameraTake` animation curve on the shot
- Playback: re-applies curve to camera, scrubable on timeline

### 5.2 LiDAR scan mode
- `ARWorldTrackingConfiguration` with `sceneReconstruction = .meshWithClassification`
- On stop: bake `ARMeshAnchor`s → `MDLAsset` → export USDZ to `Scans/`
- Scene drops scan as a `StageEntity(kind: .scan)`; locked transform by default, low-poly proxy auto-generated for editing perf

**Trade-off:** LiDAR only on Pro iPhones/iPads. Mac users can import scans created on a paired iOS device via shared CloudKit zone.

---

## 6. Sync & Sharing

### 6.1 CloudKit topology

- **Private DB:** user's projects (default)
- **Shared DB:** project shared with collaborators via `CKShare`
- **Public DB:** built-in asset catalog manifest (read-only)

### 6.2 What syncs

| Layer | Strategy |
|---|---|
| SwiftData entities | Mirror via `ModelConfiguration(cloudKitDatabase:)` |
| Assets / Scans / Audio | `CKAsset` records, lazily downloaded |
| Renders cache | **Not synced** — regenerable, save bandwidth |

### 6.3 Conflict policy

- Last-writer-wins on entity fields (CloudKit default), **except** timeline edits which use a CRDT-lite ordered list (insertion-ordered with stable IDs) to avoid lost shot reorders.
- Share links: read-only by default. Edit access requires explicit role bump.

**Trade-off:** CloudKit ties us to Apple. Acceptable given platform constraint; revisit if Android/web ever in scope.

---

## 7. Export Pipeline

```
                 ┌─────────────────┐
  Storyboard ──> │ Render shot     │ ──> PDF (PDFKit) / PNG sequence
                 │ thumbnails (1 fr│
                 │  per shot)      │
                 └─────────────────┘

                 ┌─────────────────────────────────────┐
  Animatic ────> │ Timeline → AVAssetWriter            │ ──> MP4 (H.265)
                 │  · video frames from offline render │
                 │  · audio mix from AVAudioEngine     │
                 │  · markup overlay compositor        │
                 └─────────────────────────────────────┘

                 ┌─────────────────┐
  Shot list ───> │ Query SwiftData │ ──> CSV / Final Draft tagged
                 └─────────────────┘
```

Long exports run in a background `Task` with progress published to UI. On iOS, request background time via `BGProcessingTask` for >30s renders.

---

## 8. Final Draft (.fdx) Import

- Local XMLParser → scene heading regex → create `Scene` rows; dialogue/action become `notes` on initial `Shot` placeholder.
- One-way import only (v1). Round-trip export deferred — Final Draft licensing is finicky.

---

## 9. Scale Considerations

| Concern | Plan |
|---|---|
| 10K-asset library | Manifest paginated, lazy-load USDZ on demand, `NSCache` for thumbnails |
| 5M-tri LiDAR scan | Auto-decimate proxy at import; full mesh only at export render |
| 500-shot project | Timeline virtualized (only render visible lanes); SwiftData fetch with `fetchLimit` |
| Long renders | Off-main-thread `AVAssetWriter`; chunk into 10s segments, concat |
| AI prop latency | Gateway with provider failover (Vercel AI Gateway pattern) — cache by prompt hash |

---

## 10. Open Questions / Revisit Triggers

1. **Engine choice** — RealityKit vs Unity/Unreal embed. Decision: RealityKit for v1; revisit if we need volumetric lighting / advanced cinematics.
2. **Collaboration depth** — read-only shares ship v1. Real-time co-edit (CRDT) is a v3 conversation.
3. **Windows/Android** — out of scope. If forced, the persistence layer (USDZ + JSON sidecar) is the seam to preserve.
4. **AI prop provider** — start with one (e.g. Meshy/Luma), wrap behind `PropGenerator` protocol; add gateway when usage justifies.
5. **Subscription tiers** — free/pro/studio gates need design before StoreKit wiring.
6. **Asset CDN** — start with CloudKit Public DB; migrate to dedicated CDN if catalog cost balloons.

---

## 11. Build Phasing (informs the implementation plan)

- **Phase 0** — Project shell, document model, empty 3D viewport
- **Phase 1** — Scene editing (place/transform characters/props/lights/cameras)
- **Phase 2** — Timeline + animatic playback
- **Phase 3** — Storyboard + MP4 export
- **Phase 4** — Final Draft import, shot list export
- **Phase 5** — AR virtual camera + LiDAR
- **Phase 6** — CloudKit sync + sharing
- **Phase 7** — AI prop generation, markup polish, App Store release

This phasing is what `/buddy:plan` should consume next.

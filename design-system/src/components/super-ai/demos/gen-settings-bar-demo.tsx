"use client";
import { GenSettingsBar, GenSettingsItem } from "@/components/super-ai/gen-settings-bar";
export default function GenSettingsBarDemo() {
  return (
    <GenSettingsBar aria-label="Generation settings">
      <GenSettingsItem>Veo 3.1 Fast</GenSettingsItem>
      <GenSettingsItem>16:9</GenSettingsItem>
      <GenSettingsItem>720p</GenSettingsItem>
      <GenSettingsItem>4s</GenSettingsItem>
      <GenSettingsItem>×3</GenSettingsItem>
    </GenSettingsBar>
  );
}

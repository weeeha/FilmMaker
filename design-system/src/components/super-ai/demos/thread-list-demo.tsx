"use client";
import { ThreadList, ThreadListItem, ThreadListSection } from "@/components/super-ai/thread-list";
export default function ThreadListDemo() {
  return (
    <div className="w-64 rounded-lg border p-2">
      <ThreadList aria-label="Conversations">
        <ThreadListSection label="Today">
          <ThreadListItem id="t1" title="Brand video script" active unread />
          <ThreadListItem id="t2" title="Logo explorations" pinned />
        </ThreadListSection>
        <ThreadListSection label="Yesterday">
          <ThreadListItem id="t3" title="Sound effects brief" />
        </ThreadListSection>
      </ThreadList>
    </div>
  );
}

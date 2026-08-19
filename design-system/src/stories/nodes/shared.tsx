import { useState } from 'react'
import type { ReactNode } from 'react'
import type * as React from 'react'
import { CheckIcon, Volume2Icon, VolumeXIcon } from 'lucide-react'

import { RunButton } from '@/components/ai/run-button'
import {
  NodeMenuModelSelect,
  NodeMenuModelSelectContent,
  NodeMenuModelSelectEmpty,
  NodeMenuModelSelectGroup,
  NodeMenuModelSelectInput,
  NodeMenuModelSelectItem,
  NodeMenuModelSelectItemIcon,
  NodeMenuModelSelectList,
  NodeMenuModelSelectTrigger,
  NodeMenuSelect,
  NodeMenuSelectContent,
  NodeMenuSelectGroup,
  NodeMenuSelectItem,
  NodeMenuSelectTrigger,
  NodeMenuToggle,
} from '@/components/ai/node-menu'

export type MenuModel = {
  value: string
  name: string
  description: string
  icon: ReactNode
}

/** Model pill + searchable model dropdown, same pattern as the Image Generation node. */
export const ModelPicker = ({
  models,
  defaultValue,
  heading,
}: {
  models: MenuModel[]
  defaultValue: string
  heading: string
}) => {
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState(defaultValue)
  const selected = models.find((m) => m.value === model)

  return (
    <NodeMenuModelSelect open={open} onOpenChange={setOpen}>
      <NodeMenuModelSelectTrigger>{selected?.name}</NodeMenuModelSelectTrigger>
      <NodeMenuModelSelectContent>
        <NodeMenuModelSelectInput placeholder="Search all models..." />
        <NodeMenuModelSelectList>
          <NodeMenuModelSelectEmpty>No models found.</NodeMenuModelSelectEmpty>
          <NodeMenuModelSelectGroup heading={heading}>
            {models.map((m) => (
              <NodeMenuModelSelectItem
                key={m.value}
                value={`${m.name} ${m.description}`}
                onSelect={() => {
                  setModel(m.value)
                  setOpen(false)
                }}
              >
                <NodeMenuModelSelectItemIcon>{m.icon}</NodeMenuModelSelectItemIcon>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-xs leading-snug text-muted-foreground">
                    {m.description}
                  </span>
                </span>
                {m.value === model && <CheckIcon className="ml-auto self-center" />}
              </NodeMenuModelSelectItem>
            ))}
          </NodeMenuModelSelectGroup>
        </NodeMenuModelSelectList>
      </NodeMenuModelSelectContent>
    </NodeMenuModelSelect>
  )
}

/** Text option with a labeled dropdown of choices, same pattern as the Image Generation node. */
export const OptionSelect = ({
  label,
  options,
  defaultValue,
  icon,
}: {
  label: string
  options: string[]
  defaultValue: string
  icon?: ReactNode
}) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <NodeMenuSelect>
      <NodeMenuSelectTrigger aria-label={label}>
        {icon}
        {value}
      </NodeMenuSelectTrigger>
      <NodeMenuSelectContent label={label}>
        <NodeMenuSelectGroup value={value} onValueChange={setValue}>
          {options.map((option) => (
            <NodeMenuSelectItem key={option} value={option}>
              {option}
            </NodeMenuSelectItem>
          ))}
        </NodeMenuSelectGroup>
      </NodeMenuSelectContent>
    </NodeMenuSelect>
  )
}

/** Sound on/off toggle for nodes that generate audio-backed output. */
export const SoundToggle = () => {
  const [sound, setSound] = useState(true)
  return (
    <NodeMenuToggle aria-label="Sound" pressed={sound} onPressedChange={setSound}>
      {sound ? <Volume2Icon aria-hidden="true" /> : <VolumeXIcon aria-hidden="true" />}
    </NodeMenuToggle>
  )
}

/**
 * Story-only wrapper: clicking Run switches the button to its spinner-only
 * loading state for a few seconds, demoing the real run interaction.
 */
export const DemoRunButton = (props: React.ComponentProps<typeof RunButton>) => {
  const [running, setRunning] = useState(false)
  return (
    <RunButton
      {...props}
      loading={props.loading || running}
      onRun={(e) => {
        props.onRun?.(e)
        setRunning(true)
        setTimeout(() => setRunning(false), 3000)
      }}
    />
  )
}

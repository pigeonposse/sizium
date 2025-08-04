import type { Snippet }        from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export type PopoverContentProps = { children?: Snippet } & HTMLAttributes<HTMLDivElement>
export type PopoverProps = { children?: Snippet } & HTMLAttributes<HTMLDivElement>

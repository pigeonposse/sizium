<script>

	import { userState } from '$appstate'
	import {
		Popover,
		Search,
	} from '$components'
	import { FILTER_ICON } from '$icons'

</script>

<div class="relative flex flex-cols justify-center align-center gap-4 items-center">
	<Popover.Root>
		<span class={[ 'bg-primary-500/50 hover:bg-primary-500', FILTER_ICON ]}>
		</span>
		<Popover.Content>
			<div class="label">
				<label for={userState.package.ID.sort}>Sort by</label>
				<select
					id={userState.package.ID.sort}
					name={userState.package.ID.sort}
					class="select"
					bind:value={userState.package.sortBy}
				>
					{#each Object.entries( userState.package.ID.sortText ) as [ id, label ]}
						<option value={id}>{label}</option>
					{/each}
				</select>
			</div>
		</Popover.Content>
	</Popover.Root>
	<div class="relative flex-1 max-w-xs w-[200px]">
		<Search
			id={userState.package.ID.filter}
			name={userState.package.ID.filter}
			placeholder="Filter dependencies..."
			size='small'
			bind:value={userState.package.filter}
		/>
	</div>
</div>

<script lang="ts">
	let { thief } = $props();
</script>

<section class="hero" aria-label="{thief.name} overview">
	<div class="hero__avatar-frame">
		<img src={thief.image} alt="{thief.name} portrait" class="hero__avatar" />
	</div>
	<div class="hero__info">
		<h1 class="hero__name">{thief.name}</h1>
		<div class="hero__meta">
			<span class="badge badge--level">Lv. {thief.lvl}</span>
			<span class="badge badge--awareness">Awareness {thief.awareness}</span>
		</div>
	</div>
</section>

<style>
	.hero {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		border-radius: 12px;
		border: 1px solid hsl(var(--border));
		background: hsl(var(--card));
		transition: border-color 0.2s ease;

		&:hover {
			border-color: hsl(var(--primary) / 0.3);
		}
	}

	.hero__avatar-frame {
		flex-shrink: 0;
		width: 200px;
		height: 200px;
		border-radius: 10px;
		overflow: hidden;
		border: 2px solid hsl(var(--border));
		background: hsl(var(--muted));
	}

	.hero__avatar {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.hero__info {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-width: 0;
	}

	.hero__name {
		font-size: 1.25rem;
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: -0.01em;
		color: hsl(var(--foreground));
		margin: 0;
	}

	.hero__meta {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 0.15rem 0.5rem;
		border-radius: 6px;
		line-height: 1.6;
	}

	.badge--level {
		background: hsl(var(--primary) / 0.12);
		color: hsl(var(--primary));
	}

	.badge--awareness {
		background: hsl(var(--muted));
		color: hsl(var(--muted-foreground));
	}
</style>

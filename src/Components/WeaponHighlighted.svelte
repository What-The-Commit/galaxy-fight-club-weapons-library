<script lang="ts">
    import type {IWeapon} from "../types/weapon.type";
    export let weapon: IWeapon;

    let weaponImage = "images/" + weapon.Name.toLowerCase().replaceAll(' ', '_').replaceAll('(', '_').replaceAll(')', '').replaceAll('-', '_').replaceAll('\'', '').replace('/', '_') + '.png';

    const widthForRange = {
        1: '16%',
        2: '33%',
        3: '50%',
        4: '66%',
        5: '83%',
        6: '100%',
    };

    export let highlightAADamage: boolean;
    export let highlightUltDamage: boolean;
    export let highlightRange: boolean;
</script>

<div class="card weapon-card bg-dark text-light">
    <img class="card-img-top" style="cursor: pointer;" src="{weaponImage}" alt="{weapon.Name}">
    <div class="card-body border-bottom border-light border-2">
        <h5 class="row card-title text-nowrap overflow-hidden">{weapon.Name}{#if weapon["Bound to Fighter"] === 'x'}&nbsp;(Genesis){/if}</h5>
    </div>
    <div class="card-body">
        <h5 class="row card-title text-nowrap overflow-hidden">Stats</h5>
        <div class="row mb-3 py-2" class:highlighted={highlightAADamage}>
            <div class="col icon invert">
                {#if weapon.Type === 'Ranged'}
                    <img src="icons/bow.png" alt="Damage" title="Damage" />
                {:else if weapon.Type === 'Melee'}
                    <img src="icons/sword.png" alt="Damage" title="Damage" />
                {:else if weapon.Type === 'Throwable'}
                    <img src="icons/throwable.png" alt="Damage" title="Damage" />
                {/if}
            </div>
            <div class="col text">
                {weapon["AA Damage"]}
            </div>
        </div>
        <div class="row mb-3 py-2" class:highlighted={highlightUltDamage}>
            <div class="col icon invert">
                <img src="icons/special.png" alt="Damage Ultimate" title="Damage Ultimate" />
            </div>
            <div class="col text">
                {weapon["Ult Damage"]}
            </div>
        </div>
        <div class="row mb-3 py-2" class:highlighted={highlightRange}>
            <div class="col icon icon-range invert">
                <img src="icons/range.png" alt="Range" title="Range" />
            </div>
            <div class="col">
                <div class="progress">
                    <div class="progress-bar bg-primary" style="width: {widthForRange[weapon['Range (1-6)']]}" role="progressbar" aria-valuenow="{weapon['Range (1-6)']}" aria-valuemin="1" aria-valuemax="6"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col icon invert">
                {#if weapon["Special Type"].includes('Shield')}
                    <img src="icons/shield.png" alt="Shield Block" title="Shield Block" />
                {:else if weapon["Special Type"].includes('Heal')}
                    <img src="icons/healing.png" alt="Heal" title="Heal" />
                {:else if weapon["Special Type"].includes('Dash')}
                    <img src="icons/dash.png" alt="Dash" title="Dash" />
                {:else if weapon["Special Type"].includes('Speed')}
                    <img src="icons/speed.png" alt="Speed Boost" title="Speed Boost" />
                {/if}
            </div>
            <div class="col text">
                {#if weapon["Special Type"].includes('Shield')}
                    {weapon["Special Amount"]}%
                {:else if weapon["Special Type"].includes('Heal')}
                    {weapon["Special Amount"]} HP
                {:else if weapon["Special Type"].includes('Dash')}
                {:else if weapon["Special Type"].includes('Speed')}
                    {weapon["Special Amount"]} sec
                {/if}
            </div>
        </div>
    </div>
</div>
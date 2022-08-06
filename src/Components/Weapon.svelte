<script lang="ts">
    import {ComparableWeaponsStore} from "../stores/ComparableWeaponsStore";
    import Modal from '../../node_modules/bootstrap/js/src/modal';
    import placeholderImage from "../../src/assets/placeholder.png";
    import type {IWeapon} from "../types/weapon.type";
    export let weapon: IWeapon;

    let weaponImage = "images/" + weapon.Name.toLowerCase().replaceAll(' ', '_').replaceAll('(', '_').replaceAll(')', '').replaceAll('-', '_').replaceAll('\'', '').replace('/', '_') + '.png';

    export let videoTitle: string;
    export let videoSrc: string;

    function openVideo () {
        videoSrc = 'https://www.youtube.com/embed/' + weapon.Video.replace('https://youtu.be/', '');
        videoTitle = weapon.Name;
        setTimeout(function () {
            Modal.getOrCreateInstance(document.getElementById('video-modal')).show();
        }, 500);
    }

    const widthForRange = {
        1: '16%',
        2: '33%',
        3: '50%',
        4: '66%',
        5: '83%',
        6: '100%',
    };

    let highlighted = false;

    function addOrRemoveToCompare(event: PointerEvent) {
        if (event.target.className.includes('card-img-top')) { // ignore click on image/video
            return;
        }

        const weaponIndex = $ComparableWeaponsStore.findIndex(function (weaponToAdd, weapon) {
            return weaponToAdd.Name === weapon.Name;
        }.bind(null, weapon));

        if (weaponIndex === -1) {
            ComparableWeaponsStore.set([...$ComparableWeaponsStore, weapon]);
        }

        if (weaponIndex !== -1 && highlighted) { // remove already added weapon aka toggle
            $ComparableWeaponsStore.splice(weaponIndex, 1)
            ComparableWeaponsStore.set($ComparableWeaponsStore);
        }

        highlighted = !highlighted;
    }
</script>

<div class="card weapon-card" class:highlighted on:click={addOrRemoveToCompare}>
    <img class:bg-light={weapon["Bound to Fighter"] === 'x'} class:bg-opacity-75={weapon["Bound to Fighter"] === 'x'} class:rounded={weapon["Bound to Fighter"] === 'x'} src="images/yt_logo_mono_light.png" alt="YouTube" class="youtube-logo" on:click={openVideo} />
    <img class="card-img-top" style="cursor: pointer;" src="{weaponImage}" alt="{weapon.Name}" on:click={openVideo}>
    <div class="card-body border-bottom border-dark border-2">
        <h5 class="card-title text-nowrap overflow-hidden">{weapon.Name}{#if weapon["Bound to Fighter"] === 'x'}&nbsp;(Genesis){/if}</h5>
    </div>
    <div class="card-body">
        <h5 class="card-title text-nowrap overflow-hidden">Stats</h5>
        <div class="row mb-2">
            <div class="col icon">
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
        <div class="row mb-2">
            <div class="col icon">
                <img src="icons/special.png" alt="Damage Ultimate" title="Damage Ultimate" />
            </div>
            <div class="col text">
                {weapon["Ult Damage"]}
            </div>
        </div>
        <div class="row mb-2">
            <div class="col icon icon-range">
                <img src="icons/range.png" alt="Range" title="Range" />
            </div>
            <div class="col">
                <div class="progress">
                    <div class="progress-bar bg-dark" style="width: {widthForRange[weapon['Range (1-6)']]}" role="progressbar" aria-valuenow="{weapon['Range (1-6)']}" aria-valuemin="1" aria-valuemax="6"></div>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col icon">
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
        <div class="row sell-icons text-center">
            <div class="col">
                <a href="{weapon.Opensea}" target="_blank"><img class="invert" src="images/opensea_logo_transparent.png" alt="OpenSea" title="OpenSea" /></a>
            </div>
            {#if weapon.Looksrare !== ''}
                <div class="col">
                    <a href="{weapon.Looksrare}" target="_blank"><img class="invert" src="images/looksrare-white.png" alt="LooksRare" title="LooksRare" /></a>
                </div>
            {/if}
        </div>
    </div>
</div>
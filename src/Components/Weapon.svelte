<script lang="ts">
    import Modal from '../../node_modules/bootstrap/js/src/modal';
    import placeholderImage from "../../src/assets/placeholder.png";
    import type {IWeapon} from "../types/weapon.type";
    export let weapon: IWeapon;

    let weaponImage = "images/" + weapon.Name.toLowerCase().replaceAll(' ', '_').replaceAll('(', '_').replaceAll(')', '').replaceAll('-', '_').replaceAll('\'', '') + '.png';

    if (weapon["Bound to Fighter"] === 'x') {
        weaponImage = placeholderImage;
    }

    export let videoTitle: string;
    export let videoSrc: string;

    function openVideo () {
        videoSrc = 'https://www.youtube.com/embed/' + weapon.Video.replace('https://youtu.be/', '');
        videoTitle = weapon.Name;
        setTimeout(function () {
            Modal.getOrCreateInstance(document.getElementById('video-modal')).show();
        }, 500);
    }
</script>

<div class="card">
    <img class="card-img-top" style="cursor: pointer;" src="{weaponImage}" alt="{weapon.Name}" on:click={openVideo}>
    <div class="card-body">
        <h5 class="card-title">{weapon.Name}{#if weapon["Bound to Fighter"] === 'x'}&nbsp;(Genesis){/if}</h5>
    </div>
</div>
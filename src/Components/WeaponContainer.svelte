<script lang="ts">
    import Select from "svelte-select";

    import weapons from "../data/weapons";
    import Weapon from "./Weapon.svelte";
    import type {IWeapon} from "../types/weapon.type";

    import {readable, writable, derived} from "svelte/store";
    import type {Readable, Writable} from "svelte/store";

    import {ComparableWeaponsStore} from "../stores/ComparableWeaponsStore";
    import WeaponHighlighted from "./WeaponHighlighted.svelte";

    const allWeaponStore: Readable<IWeapon[]> = readable(weapons);

    const filterName: Writable<string> = writable('');
    const filterTiers: Writable<object[]> = writable([]);
    const filterTypes: Writable<object[]> = writable([]);
    const filterAADamageTypes: Writable<object[]> = writable([]);
    const filterUltDamageTypes: Writable<object[]> = writable([]);
    const filterSpecialTypes: Writable<object[]> = writable([]);
    const sort: Writable<object> = writable({value: 'tier', label: 'Tier/Rarity'});
    const sortDirection: Writable<object> = writable({value: 'desc', label: 'Descending'});

    const filterTierOptions = [
        {value: 'Basic', label: 'Basic'},
        {value: 'Common', label: 'Common'},
        {value: 'Uncommon', label: 'Uncommon'},
        {value: 'Rare', label: 'Rare'},
        {value: 'Epic', label: 'Epic'},
        {value: 'Legendary', label: 'Legendary'},
        {value: 'Mythic', label: 'Mythic'},
        {value: 'Exotic', label: 'Exotic'},
    ];

    const filterTypeOptions = [
        {value: 'Melee', label: 'Melee'},
        {value: 'Ranged', label: 'Ranged'},
        {value: 'Throwable', label: 'Throwable'},
    ];

    const filterAADamageTypeOptions = [
        {value: 'Flat', label: 'Flat'},
        {value: 'Double', label: 'Double'},
        {value: 'Tripple', label: 'Tripple'},
        {value: 'AOE', label: 'Area of effect (AOE)'},
        {value: 'Cone', label: 'Cone'},
        {value: 'DOT', label: 'Damage over time (DOT)'},
        {value: 'Boomerang', label: 'Boomerang'},
        {value: 'Knockback', label: 'Knockback'},
        {value: 'Line', label: 'Line'},
        {value: 'Bounce', label: 'Bounce'},
    ];

    const filterUltDamageTypeOptions = [
        {value: 'Flat', label: 'One Projectile'},
        {value: 'Double', label: 'Two Projectiles'},
        {value: 'Tripple', label: 'Tripple'},
        {value: 'Four', label: 'Four Projectiles'},
        {value: 'Five', label: 'Five Projectiles'},
        {value: 'Six', label: 'Six Projectiles'},
        {value: 'AOE', label: 'Area of effect (AOE)'},
        {value: 'Cone', label: 'Cone'},
        {value: 'DOT', label: 'Damage over time (DOT)'},
        {value: 'Boomerang', label: 'Boomerang'},
        {value: 'Knockback', label: 'Knockback'},
        {value: 'Line', label: 'Line'},
        {value: 'Bounce', label: 'Bounce'},
        {value: 'Stun', label: 'Stun'},
        {value: 'Slow', label: 'Slow'},
        {value: 'Charm', label: 'Taunt'},
    ];

    const filterSpecialTypeOptions = [
        {value: 'Speed Boost', label: 'Speed Boost'},
        {value: 'Dash', label: 'Dash'},
        {value: 'Flat Heal', label: 'Heal'},
        {value: 'Shield Block in %', label: 'Shield'},
    ];

    const sortOptions = [
        {value: 'tier', label: 'Tier/Rarity'},
        {value: 'range', label: 'Range'},
        {value: 'aa_damage', label: 'AA Damage'},
        {value: 'ult_damage', label: 'Ult Damage'},
    ];

    const sortDirectionOptions = [
        {value: 'desc', label: 'Descending'},
        {value: 'asc', label: 'Ascending'},
    ];

    const filteredWeaponStore = derived(
        [allWeaponStore, filterName, filterTiers, filterTypes, filterAADamageTypes, filterUltDamageTypes, filterSpecialTypes, sort, sortDirection],
        function ([$allWeaponStore, $filterName, $filterTiers, $filterTypes, $filterAADamageTypes, $filterUltDamageTypes, $filterSpecialTypes, $sort, $sortDirection]) {
        $allWeaponStore = $allWeaponStore.filter(function (weapon) {
            let filterApplied = false;
            let shouldReturn = true;

            let matchesName = true;
            if ($filterName !== "") {
                filterApplied = true;
                matchesName = weapon.Name.toLowerCase().includes($filterName.toLowerCase());
            }

            let matchesTier = true;
            if ($filterTiers !== undefined && $filterTiers.length !== 0) {
                filterApplied = true;
                matchesTier = $filterTiers.findIndex(function (filterTier) {
                    return filterTier.value.toLowerCase() === weapon.Tier.toLowerCase()
                }) !== -1;
            }

            let matchesType = true;
            if ($filterTypes !== undefined && $filterTypes.length !== 0) {
                filterApplied = true;
                matchesType = $filterTypes.findIndex(function (filterType) {
                    return filterType.value.toLowerCase() === weapon.Type.toLowerCase()
                }) !== -1;
            }

            let matchesAADamageType = true;
            if ($filterAADamageTypes !== undefined && $filterAADamageTypes.length !== 0) {
                filterApplied = true;

                let firstIteration = true;
                for (const filterAADamageType of $filterAADamageTypes) {
                    matchesAADamageType = (matchesAADamageType || firstIteration) && weapon["AA Type"].includes(filterAADamageType.value);
                    firstIteration = false;
                }
            }

            let matchesUltDamageType = true;
            if ($filterUltDamageTypes !== undefined && $filterUltDamageTypes.length !== 0) {
                filterApplied = true;

                let firstIteration = true;
                for (const filterUltDamageType of $filterUltDamageTypes) {
                    matchesUltDamageType = (matchesUltDamageType || firstIteration) && weapon["Ult Type"].includes(filterUltDamageType.value);
                    firstIteration = false;
                }
            }

            let matchesSpecialType = true;
            if ($filterSpecialTypes !== undefined && $filterSpecialTypes.length !== 0) {
                filterApplied = true;
                matchesSpecialType = $filterSpecialTypes.findIndex(function (filterSpecialType) {
                    return weapon["Special Type"].toLowerCase().includes(filterSpecialType.value.toLowerCase())
                }) !== -1;
            }

            if (filterApplied === false) {
                return shouldReturn;
            }

            return matchesName && matchesTier && matchesType && matchesAADamageType && matchesUltDamageType && matchesSpecialType;
        });

        if ($sort !== null && $sort !== undefined) {
            if ($sortDirection === null ||$sortDirection === undefined) {
                $sortDirection = {value: 'desc', label: 'Descending'};
            }

            const tierSort = {
                Basic: 7,
                Common: 6,
                Uncommon: 5,
                Rare: 4,
                Epic: 3,
                Legendary: 2,
                Mythic: 1,
                Exotic: 0
            };

            $allWeaponStore.sort(function (weaponA, weaponB) {
                if ($sortDirection.value === 'asc') {
                    if ($sort.value === 'tier') {
                        return tierSort[weaponA.Tier] - tierSort[weaponB.Tier];
                    }

                    if ($sort.value === 'range') {
                        return weaponA["Range (1-6)"] - weaponB["Range (1-6)"];
                    }

                    if ($sort.value === 'aa_damage') {
                        return weaponA["AA Damage"] - weaponB["AA Damage"];
                    }

                    if ($sort.value === 'ult_damage') {
                        return weaponA["Ult Damage"] - weaponB["Ult Damage"];
                    }
                }

                if ($sortDirection.value === 'desc') {
                    if ($sort.value === 'tier') {
                        return tierSort[weaponB.Tier] - tierSort[weaponA.Tier];
                    }

                    if ($sort.value === 'range') {
                        return weaponB["Range (1-6)"] - weaponA["Range (1-6)"];
                    }

                    if ($sort.value === 'aa_damage') {
                        return weaponB["AA Damage"] - weaponA["AA Damage"];
                    }

                    if ($sort.value === 'ult_damage') {
                        return weaponB["Ult Damage"] - weaponA["Ult Damage"];
                    }
                }

                return 0;
            });
        }

        return $allWeaponStore;
    });

    let videoTitle: string = "";
    let videoSrc: string = "";

    let highestStatsByWeaponName = {};

    ComparableWeaponsStore.subscribe(function (weapons) { // update highest stats for each weapon
       highestStatsByWeaponName = {};
       let aaDamage, ultDamage, range;

       let firstIteration = true;
       for (const weapon of weapons) {
           if (firstIteration) {
               aaDamage = {name: weapon.Name, value: weapon["AA Damage"]};
               ultDamage = {name: weapon.Name, value: weapon["Ult Damage"]};
               range = {name: weapon.Name, value: weapon["Range (1-6)"]};

               firstIteration = false;
               continue;
           }

           if (aaDamage.value < weapon["AA Damage"]) {
               aaDamage = {name: weapon.Name, value: weapon["AA Damage"]};
           }

           if (ultDamage.value < weapon["Ult Damage"]) {
               ultDamage = {name: weapon.Name, value: weapon["Ult Damage"]};
           }

           if (range.value < weapon["Range (1-6)"]) {
               range = {name: weapon.Name, value: weapon["Range (1-6)"]};
           }
       }

       if (weapons.length !== 0) {
            highestStatsByWeaponName[aaDamage.name] = ['aaDamage'];

            if (highestStatsByWeaponName.hasOwnProperty(ultDamage.name)) {
                highestStatsByWeaponName[ultDamage.name].push('ultDamage');
            } else {
                highestStatsByWeaponName[ultDamage.name] = ['ultDamage'];
            }

           if (highestStatsByWeaponName.hasOwnProperty(range.name)) {
               highestStatsByWeaponName[range.name].push('range');
           } else {
               highestStatsByWeaponName[range.name] = ['range'];
           }
       }
    });

    function clearStore() {
        ComparableWeaponsStore.set([])
    };
</script>

<div id="weapon-container">
    <div class="d-flex gap-xl-4 gap-1 filter-container mb-4">
        <input id="filter-name" class="form-control" type="text" placeholder="Name" bind:value={$filterName} name="search"/>

        <Select items={filterTypeOptions} bind:value={$filterTypes} isMulti=true placeholder="Type" placeholderAlwaysShow=true />
        <Select items={filterTierOptions} bind:value={$filterTiers} isMulti=true placeholder="Tier" placeholderAlwaysShow=true />
        <Select items={filterAADamageTypeOptions} bind:value={$filterAADamageTypes} isMulti=true placeholder="AA Damage Type" placeholderAlwaysShow=true />
    </div>

    <div class="d-flex gap-xl-4 gap-1 filter-container">
        <Select items={filterUltDamageTypeOptions} bind:value={$filterUltDamageTypes} isMulti=true placeholder="Ult Damage Type" placeholderAlwaysShow=true />
        <Select items={filterSpecialTypeOptions} bind:value={$filterSpecialTypes} isMulti=true placeholder="Special Type" placeholderAlwaysShow=true />

        <Select items={sortOptions} bind:value={$sort} placeholder="Sort by" placeholderAlwaysShow=true />
        <Select items={sortDirectionOptions} bind:value={$sortDirection} placeholder="Sort order" placeholderAlwaysShow=true />
    </div>

    {#if $ComparableWeaponsStore.length !== 0}
    <div class="bg-light rounded-3 p-3 mt-4">
        <h1 class="m-0 mb-2 float">Compare Weapons<button class="btn btn-outline-primary bg-dark border-white text-white float-end shadow-none" on:click={clearStore}>X</button></h1>
        <div class="row row-cols-1 row-cols-xl-4 row-cols-sm-2 weapon-container-inner" id="weapon-container-comparable">
            {#each $ComparableWeaponsStore as weapon (weapon.Name)}
                <div class="col">
                    <WeaponHighlighted
                            weapon={weapon}
                            highlightAADamage={highestStatsByWeaponName[weapon.Name] ? highestStatsByWeaponName[weapon.Name].includes('aaDamage') : false}
                            highlightUltDamage={highestStatsByWeaponName[weapon.Name] ? highestStatsByWeaponName[weapon.Name].includes('ultDamage') : false}
                            highlightRange={highestStatsByWeaponName[weapon.Name] ? highestStatsByWeaponName[weapon.Name].includes('range') : false}
                    />
                </div>
            {/each}
        </div>
    </div>
    {/if}

    <div class="row row-cols-1 row-cols-xl-4 row-cols-sm-2 mt-4 weapon-container-inner">
    {#each $filteredWeaponStore as weapon (weapon.Name)}
        <div class="col mb-4">
        <Weapon weapon={weapon} bind:videoSrc={videoSrc} bind:videoTitle={videoTitle} />
        </div>
    {/each}
    </div>
</div>

<div class="modal" tabindex="-1" id="video-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <iframe height="500" title={videoTitle} src={videoSrc} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
</div>
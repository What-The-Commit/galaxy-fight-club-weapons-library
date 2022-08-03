<script lang="ts">
  import { onMount } from 'svelte';
  import WeaponContainer from "./Components/WeaponContainer.svelte";

  onMount(() => {
    const scrollBtn = document.querySelector(".btn");

    const btnVisibility = () => {
      if (window.scrollY > 400) {
        scrollBtn.style.visibility = "visible";
      } else {
        scrollBtn.style.visibility = "hidden";
      }
    };

    document.addEventListener("scroll", () => {
      btnVisibility();
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });
</script>

<header class="d-flex mb-4 justify-content-between">
  <a href="https://galaxyfightclub.com" target="_blank">
    <img id="gfc-logo-shield" src="images/gfc_logo_shield.svg" alt="Galaxy Fight Club" />
    <img id="gfc-logo" src="images/gfc_logo.svg" alt="Galaxy Fight Club" />
  </a>
  <h1 class="text-white">Weapon Library<br /><p class="m-0 p-0 text-end" style="font-size: small;">Patch 1.1.5</p></h1>
</header>

<main>
  <WeaponContainer />
</main>

<footer class="pb-4 text-white-50">
  <p>Made with ♥ by <a href="https://what-the-commit.com/" class="text-white">What The Commit</a> (<a href="https://twitter.com/bavragor94" class="text-white">tony-stark.eth</a>) for the <a href="https://galaxyfightclub.com" target="_blank" class="text-white">Galaxy Fight Club</a> community

  </p>
  <p>
    For supporting my projects and keep them running, feel free to tip <b style="color: white;">tony-stark.eth</b>
  </p>
</footer>

<div class="scroll-to-top">
    <span class="btn btn-position btn-style">^</span>
</div>
!function(){var e,n;function i(){e=document.querySelectorAll(".hidden"),n=window.innerHeight}function t(){for(var i=0;i<e.length;i++){var t=e[i];e[i].getBoundingClientRect().top-n<=0&&(t.classList.add("fade-in-element"),t.classList.remove("hidden"))}}window.addEventListener("scroll",t),window.addEventListener("resize",i),i(),t()}();
//# sourceMappingURL=all.js.map

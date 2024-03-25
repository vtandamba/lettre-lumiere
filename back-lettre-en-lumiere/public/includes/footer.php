</main>
<footer>
    <h3>@ by artfullcode</h3>
</footer>


<script>
    // Script pour l'accordéon
    document.addEventListener('DOMContentLoaded', function () {
        var accordions = document.querySelectorAll('.accordion');

        accordions.forEach(function (accordion) {
            var title = accordion.querySelector('.accordion-title');
            var content = accordion.querySelector('.accordion-content');

            // Ajoutez un gestionnaire d'événement au clic sur le titre de l'accordéon
            title.addEventListener('click', function () {
                // Basculez la visibilité du contenu de l'accordéon
                content.style.display = content.style.display === 'block' ? 'none' : 'block';

                // Ajoutez ou supprimez la classe "active" pour changer l'icône ou le style si nécessaire
                title.classList.toggle('active');
            });
        });
    }); 
</script>
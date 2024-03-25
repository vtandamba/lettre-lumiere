<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>page accueil</title>
    <style>
        .accordion {
            background-color: #f1f1f1;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        .accordion-title {
            background-color: #ddd;
            padding: 10px;
            cursor: pointer;
        }

        .accordion-content {
            padding: 10px;
            display: none;
        }

        .sub-accordion {
            background-color: #e6e6e6;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        .sub-accordion-title {
            background-color: #ccc;
            padding: 5px;
            cursor: pointer;
        }

        .sub-accordion-content {
            padding: 5px;
            display: none;
        }
    </style>
</head>

<body>

    <p> page d'accueil</p>

    <?php
    // Données pour les accordeons (par exemple, à partir d'une base de données)
    $accordions = array(
        array(
            'title' => 'Les Utilisateurs',
            'content' => ' ', // Chemin vers le fichier PHP à inclure pour le contenu de la section 1
            'sub_accordions' => array(
                array(
                    'title' => 'Voir',
                    'content' => 'users/all_users.php' // Chemin vers le fichier PHP à inclure pour l'action "Voir"
                ),
                array(
                    'title' => 'Éditer',
                    'content' => 'users/edit_user.php' // Chemin vers le fichier PHP à inclure pour l'action "Éditer"
                )
            )
        ),
        array(
            'title' => 'Les étapes',
            'content' => 'stages/index.php', // Chemin vers le fichier PHP à inclure pour le contenu de la section 2
            'sub_accordions' => array(
                array(
                    'title' => 'Voir',
                    'content' => 'stages/view_stage.php' // Chemin vers le fichier PHP à inclure pour l'action "Voir"
                ),
                array(
                    'title' => 'Éditer',
                    'content' => 'stages/edit_stage.php' // Chemin vers le fichier PHP à inclure pour l'action "Éditer"
                )
            )
        ),
        array(
            'title' => 'Les séquences',
            'content' => 'sequences/index.php', // Chemin vers le fichier PHP à inclure pour le contenu de la section 3
            'sub_accordions' => array(
                array(
                    'title' => 'Voir',
                    'content' => 'sequences/view_sequence.php' // Chemin vers le fichier PHP à inclure pour l'action "Voir"
                ),
                array(
                    'title' => 'Éditer',
                    'content' => 'sequences/edit_sequence.php' // Chemin vers le fichier PHP à inclure pour l'action "Éditer"
                )
            )
        )
    );
    ?>

    <?php foreach ($accordions as $accordion): ?>
        <div class="accordion">
            <div class="accordion-title">
                <?php echo $accordion['title']; ?>
            </div>
            <div class="accordion-content">
                <?php include $accordion['content']; ?>
                <!-- Inclure le contenu de la section depuis le fichier PHP spécifié -->

                <?php foreach ($accordion['sub_accordions'] as $sub_accordion): ?>
                    <div class="sub-accordion">
                        <div class="sub-accordion-title">
                            <?php echo $sub_accordion['title']; ?>
                        </div>
                        <div class="sub-accordion-content">
                            <?php include $sub_accordion['content']; ?>
                            <!-- Inclure le contenu de l'action depuis le fichier PHP spécifié -->
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    <?php endforeach; ?>

    <script>
        // Récupérer tous les éléments d'accordéon
        var accordions = document.querySelectorAll('.accordion');

        // Parcourir chaque élément d'accordéon
        accordions.forEach(function (accordion) {
            // Ajouter un écouteur d'événements au clic sur le titre de l'accordéon
            accordion.querySelector('.accordion-title').addEventListener('click', function () {
                // Basculer la visibilité du contenu de l'accordéon
                var content = accordion.querySelector('.accordion-content');
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
            });
        });

        // Récupérer tous les éléments de sous-accordéon
        var subAccordions = document.querySelectorAll('.sub-accordion');

        // Parcourir chaque élément de sous-accordéon
        subAccordions.forEach(function (subAccordion) {
            // Ajouter un écouteur d'événements au clic sur le titre du sous-accordéon
            subAccordion.querySelector('.sub-accordion-title').addEventListener('click', function () {
                // Basculer la visibilité du contenu du sous-accordéon
                var content = subAccordion.querySelector('.sub-accordion-content');
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
            });
        });
    </script>
</body>

</html>
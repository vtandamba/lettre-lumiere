-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS l_USER;
DROP TABLE IF EXISTS l_SEQUENCES;
DROP TABLE IF EXISTS l_STAGES;
DROP TABLE IF EXISTS l_REPORT;
DROP TABLE IF EXISTS l_EXERCICES;
DROP TABLE IF EXISTS l_USER_PROGRESS;
DROP TABLE IF EXISTS l_PROGRESS_SEQ;

-- Création de la table l_USER
CREATE TABLE IF NOT EXISTS l_USER (
    user_id INTEGER PRIMARY KEY,
    user_name VARCHAR,
    user_surname VARCHAR,
    user_password VARCHAR
);

-- Création de la table l_STAGES
CREATE TABLE IF NOT EXISTS l_STAGES (
    stage_id INTEGER PRIMARY KEY,
    sta_name VARCHAR,
    sta_description VARCHAR
);

-- Création de la table l_SEQUENCES
CREATE TABLE IF NOT EXISTS l_SEQUENCES (
    sequence_id INTEGER PRIMARY KEY,
    seq_title VARCHAR,
    stage_id INTEGER,
    seq_description VARCHAR,
    seq_content VARCHAR,
    FOREIGN KEY (stage_id) REFERENCES l_STAGES(stage_id)
);

-- Création de la table l_EXERCICES
CREATE TABLE IF NOT EXISTS l_EXERCICES (
    exercice_id INTEGER PRIMARY KEY,
    sequence_id INTEGER,
    exo_type VARCHAR,
    exo_consigne VARCHAR,
    exo_choices TEXT,
    exo_ordre INTEGER,
    FOREIGN KEY (sequence_id) REFERENCES l_SEQUENCES(sequence_id)
);

-- Création de la table l_REPORT avec une clé primaire composée
CREATE TABLE IF NOT EXISTS l_REPORT (
    stage_id INTEGER,
    sequence_id INTEGER,
    rep_type VARCHAR,
    rep_contenu TEXT,
    PRIMARY KEY (stage_id, sequence_id)
);

-- Création de la table l_USER_PROGRESS avec une clé primaire composée
CREATE TABLE IF NOT EXISTS l_USER_PROGRESS (
    user_id INTEGER,
    exercice_id INTEGER,
    pro_score INT,
    pro_date DATETIME,
    PRIMARY KEY (user_id, exercice_id),
    FOREIGN KEY (user_id) REFERENCES l_USER(user_id),
    FOREIGN KEY (exercice_id) REFERENCES l_EXERCICES(exercice_id)
);

-- Création de la table l_PROGRESS_SEQ avec une clé primaire composée
CREATE TABLE IF NOT EXISTS l_PROGRESS_SEQ (
    user_id INTEGER,
    sequence_id INTEGER,
    completed BOOLEAN,
    seq_score INT,
    PRIMARY KEY (user_id, sequence_id),
    FOREIGN KEY (user_id) REFERENCES l_USER(user_id),
    FOREIGN KEY (sequence_id) REFERENCES l_SEQUENCES(sequence_id)
);

-- Activer les contraintes de clé étrangère
PRAGMA foreign_keys = ON;

-- insertion
-- Insertion de données dans la table l_SEQUENCES
INSERT INTO l_USER (user_name, user_surname, user_password)
VALUES ('lego', 'rose', 'admin1'),
    ('burr', 'camille', 'admin2');
INSERT INTO l_SEQUENCES (
        seq_title,
        stage_id,
        seq_description,
        seq_content
    )
VALUES (
        'a-e-i',
        1,
        'Les voyelles',
        '["a", "e", "i"]'
    ),
    (
        'o-u-é',
        1,
        'Les voyelles',
        '["o", "u", "é"]'
    ),
    ('l', 1, 'La lettre L', '["l"]'),
    ('r', 1, 'La lettre R', '["r"]'),
    (
        'lettre muette',
        1,
        'Lettre Muette',
        '["lettre muette"]'
    ),
    ('f', 2, 'La lettre F', '["f"]'),
    ('j', 2, 'La lettre J', '["j"]'),
    ('v', 3, 'La lettre V', '["v"]'),
    ('b', 3, 'La lettre B', '["b"]'),
    ('CH', 4, 'CH', '["ch"]'),
    ('P', 4, 'La lettre P', '["p"]');
-- Insertion de données dans la table l_STAGES
INSERT INTO l_STAGES (sta_name, sta_description)
VALUES ('Etape 1', 'Etape 1'),
    ('Etape 2', 'Etape 2'),
    ('Etape 3', 'Etape 3'),
    ('Etape 4', 'Etape 4'),
    ('Etape 5', 'Etape 5');
-- Insertion de données dans la table l_EXERCICES
INSERT INTO l_EXERCICES (
        sequence_id,
        exo_type,
        exo_consigne,
        exo_choices,
        exo_ordre
    )
VALUES (
        1,
        'A1',
        'Ecoute et répète',
        '[{"value": "la", "image": null, "chosenSyllable":null}, {"value": "le", "image": null, "chosenSyllable":null}, {"value": "li", "image": null, "chosenSyllable":null}, 
        {"value": "ma", "image": null, "chosenSyllable":null}, {"value": "mi", "image": null, "chosenSyllable":null}, {"value": "pe", "image": null, "chosenSyllable":null}]',
        1
    ),
    (
        1,
        'B1',
        'Trouve la bonne syllabe',
        '[{"value": "la", "image": null, "chosenSyllable":null}, {"value": "le", "image": null, "chosenSyllable":null}, {"value": "li", "image": null, "chosenSyllable":null}, {"value": "ma", "image": null, "chosenSyllable":null}, {"value": "mi", "image": null, "chosenSyllable":null}, {"value": "pe", "image": null, "chosenSyllable":null}]',
        2
    ),
    (
        1,
        'C1',
        'Écris la syllabe (avec modèle)',
        '[{"value": "la", "image": null, "chosenSyllable":null}, {"value": "le", "image": null, "chosenSyllable":null}, {"value": "li", "image": null, "chosenSyllable":null}, {"value": "ma", "image": null, "chosenSyllable":null}, {"value": "mi", "image": null, "chosenSyllable":null}, {"value": "pe", "image": null, "chosenSyllable":null}]',
        3
    ),
    (
        1,
        'D1',
        'Trouve les 3 écritures de la même syllabe',
        '[{"value": "la", "image": null, "chosenSyllable":null}, {"value": "le", "image": null, "chosenSyllable":null}, {"value": "li", "image": null, "chosenSyllable":null}, {"value": "ma", "image": null, "chosenSyllable":null}, {"value": "mi", "image": null, "chosenSyllable":null}, {"value": "pe", "image": null, "chosenSyllable":null}]',
        4
    ),
    (
        1,
        'E1',
        'Écris la syllabe (sans modèle)',
        '[{"value": "la", "image": null, "chosenSyllable":null}, {"value": "le", "image": null, "chosenSyllable":null}, {"value": "li", "image": null, "chosenSyllable":null}, {"value": "ma", "image": null, "chosenSyllable":null}, {"value": "mi", "image": null, "chosenSyllable":null}, {"value": "pe", "image": null, "chosenSyllable":null}]',
        5
    ),
    (
        1,
        'G1',
        'Trouve la bonne syllabe le plus vite possible.',
        '[{"value": "la", "image": null, "chosenSyllable":null}, {"value": "le", "image": null, "chosenSyllable":null}, {"value": "li", "image": null, "chosenSyllable":null}, {"value": "ma", "image": null, "chosenSyllable":null}, {"value": "mi", "image": null, "chosenSyllable":null}, {"value": "pe", "image": null, "chosenSyllable":null}]',
        6
    ),
    (
        2,
        'A1',
        'Ecoute et répète',
        '[{"value": "lé", "image": null, "chosenSyllable":null}, {"value": "lo", "image": null, "chosenSyllable":null}, {"value": "lu", "image": null, "chosenSyllable":null}, {"value": "mo", "image": null, "chosenSyllable":null}, {"value": "mu", "image": null, "chosenSyllable":null}, {"value": "pé", "image": null, "chosenSyllable":null}]',
        1
    ),
    (
        2,
        'B1',
        'Trouve la bonne syllabe',
        '[{"value": "lé", "image": null, "chosenSyllable":null}, {"value": "lo", "image": null, "chosenSyllable":null}, {"value": "lu", "image": null, "chosenSyllable":null}, {"value": "mo", "image": null, "chosenSyllable":null}, {"value": "mu", "image": null, "chosenSyllable":null}, {"value": "pé", "image": null, "chosenSyllable":null}]',
        2
    ),
    (
        2,
        'C1',
        'Écris la syllabe (avec modèle)',
        '[{"value": "lé", "image": null, "chosenSyllable":null}, {"value": "lo", "image": null, "chosenSyllable":null}, {"value": "lu", "image": null, "chosenSyllable":null}, {"value": "mo", "image": null, "chosenSyllable":null}, {"value": "mu", "image": null, "chosenSyllable":null}, {"value": "pé", "image": null, "chosenSyllable":null}]',
        3
    ),
    (
        2,
        'D1',
        'Trouve les 3 écritures de la même syllabe',
        '[{"value": "lé", "image": null, "chosenSyllable":null}, {"value": "lo", "image": null, "chosenSyllable":null}, {"value": "lu", "image": null, "chosenSyllable":null}, {"value": "mo", "image": null, "chosenSyllable":null}, {"value": "mu", "image": null, "chosenSyllable":null}, {"value": "pé", "image": null, "chosenSyllable":null}]',
        4
    ),
    (
        2,
        'E1',
        'Écris la syllabe (sans modèle)',
        '[{"value": "lé", "image": null, "chosenSyllable":null}, {"value": "lo", "image": null, "chosenSyllable":null}, {"value": "lu", "image": null, "chosenSyllable":null}, {"value": "mo", "image": null, "chosenSyllable":null}, {"value": "mu", "image": null, "chosenSyllable":null}, {"value": "pé", "image": null, "chosenSyllable":null}]',
        5
    ),
    (
        2,
        'G1',
        'Trouve la bonne syllabe le plus vite possible.',
        '[{"value": "lé", "image": null, "chosenSyllable":null}, {"value": "lo", "image": null, "chosenSyllable":null}, {"value": "lu", "image": null, "chosenSyllable":null}, {"value": "mo", "image": null, "chosenSyllable":null}, {"value": "mu", "image": null, "chosenSyllable":null}, {"value": "pé", "image": null, "chosenSyllable":null}]',
        6
    ),
    (
        3,
        'A1',
        'Ecoute et répète',
        '[{"value": "la", "image": null, "chosenSyllable":null}, {"value": "le", "image": null, "chosenSyllable":null}, {"value": "li", "image": null, "chosenSyllable":null}, {"value": "ma", "image": null, "chosenSyllable":null}, {"value": "mi", "image": null, "chosenSyllable":null}, {"value": "pe", "image": null, "chosenSyllable":null}]',
        1
    ),
    (
        3,
        'B1',
        'Trouve la bonne syllabe',
        '[{"value": "la", "image": null, "chosenSyllable":null}, {"value": "le", "image": null, "chosenSyllable":null}, {"value": "li", "image": null, "chosenSyllable":null}, {"value": "ma", "image": null, "chosenSyllable":null}, {"value": "mi", "image": null, "chosenSyllable":null}, {"value": "pe", "image": null, "chosenSyllable":null}]',
        2
    ),
    (
        3,
        'C1',
        'Écris la syllabe (avec modèle)',
        '[{"value": "la", "image": null, "chosenSyllable":null}, {"value": "le", "image": null, "chosenSyllable":null}, {"value": "li", "image": null, "chosenSyllable":null}, {"value": "ma", "image": null, "chosenSyllable":null}, {"value": "mi", "image": null, "chosenSyllable":null}, {"value": "pe", "image": null, "chosenSyllable":null}]',
        3
    ),
    (
        3,
        'D1',
        'Trouve les 3 écritures de la même syllabe',
        '[{"value": "la", "image": null, "chosenSyllable":null}, {"value": "le", "image": null, "chosenSyllable":null}, {"value": "li", "image": null, "chosenSyllable":null}, {"value": "ma", "image": null, "chosenSyllable":null}, {"value": "mi", "image": null, "chosenSyllable":null}, {"value": "pe", "image": null, "chosenSyllable":null}]',
        4
    ),
    (
        3,
        'E1',
        'Écris la syllabe (sans modèle)',
        '[{"value": "la", "image": null, "chosenSyllable":null}, {"value": "le", "image": null, "chosenSyllable":null}, {"value": "li", "image": null, "chosenSyllable":null}, {"value": "ma", "image": null, "chosenSyllable":null}, {"value": "mi", "image": null, "chosenSyllable":null}, {"value": "pe", "image": null , "chosenSyllable":"null"}]',
        5
    ),
    (
        3,
        'G1',
        'Trouve la bonne syllabe le plus vite possible.',
        '[{"value": "la", "image": null, "chosenSyllable":null}, {"value": "le", "image": null, "chosenSyllable":null}, {"value": "li", "image": null, "chosenSyllable":null}, {"value": "ma", "image": null, "chosenSyllable":null}, {"value": "mi", "image": null, "chosenSyllable":null}, {"value": "pe", "image": null , "chosenSyllable":"null"}]',
        6
    ),
    (
        3,
        'A2',
        'Écoutes et repètes ',
        '[{"value": "salé", "image": "salé.jpg", "chosenSyllable":null}, {"value": "sali", "image": "sali.jpg", "chosenSyllable":null}, {"value": "lavé", "image": "lavé.jpg", "chosenSyllable":null}, {"value": "lune", "image":"lune.jpg", "chosenSyllable":null }, {"value": "pile", "image": "pile.jpg", "chosenSyllable":null}, {"value": "vélo", "image": "vélo.avif", "chosenSyllable":null}]',
        7
    ),
    (
        3,
        'B2',
        "Trouve le bon mot en fonction de l'image.",
        '[{"value": "salé", "image": "salé.jpg", "chosenSyllable":null}, {"value": "sali", "image": "sali.jpg", "chosenSyllable":null}, {"value": "lavé", "image": "lavé.jpg", "chosenSyllable":null}, {"value": "lune", "image":"lune.jpg" , "chosenSyllable":null}, {"value": "pile", "image": "pile.jpg", "chosenSyllable":null}, {"value": "vélo", "image": "vélo.avif", "chosenSyllable":null}]',
        8
    ),
    (
        3,
        'C2 bis',
        "Trouve le bon mot en fonction de l'image. (C2 bis)",
        '[{"value": "salé", "image": "salé.jpg", "chosenSyllable":null}, {"value": "sali", "image": "sali.jpg", "chosenSyllable":null}, {"value": "lavé", "image": "lavé.jpg", "chosenSyllable":null}, {"value": "lune", "image":"lune.jpg", "chosenSyllable":null }, {"value": "pile", "image": "pile.jpg", "chosenSyllable":null}, {"value": "vélo", "image": "vélo.avif", "chosenSyllable":null}]',
        9
    ),
    (
        3,
        'E2 bis',
        "Trouve le bon mot en fonction de l'image. (E2 bis)",
        '[{"value": "salé", "image": "salé.jpg", "chosenSyllable":null}, {"value": "sali", "image": "sali.jpg", "chosenSyllable":null}, {"value": "lavé", "image": "lavé.jpg", "chosenSyllable":null}, {"value": "lune", "image":"lune.jpg" , "chosenSyllable":null}, {"value": "pile", "image": "pile.jpg", "chosenSyllable":null}, {"value": "vélo", "image": "vélo.avif", "chosenSyllable":null}]',
        9
    );
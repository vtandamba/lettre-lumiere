-- SQLite
-- Suppression de la table l_USER si elle existe
DROP TABLE IF EXISTS l_USER;
-- Suppression de la table l_SEQUENCES si elle existe
DROP TABLE IF EXISTS l_SEQUENCES;
-- Suppression de la table l_STAGES si elle existe
DROP TABLE IF EXISTS l_STAGES;
-- Suppression de la table l_EXERCICES si elle existe
DROP TABLE IF EXISTS l_EXERCICES;
-- Suppression de la table l_USER_PROGRESS si elle existe
DROP TABLE IF EXISTS l_USER_PROGRESS;
-- Suppression de la table l_USER_PROGRESS_SEQ si elle existe
DROP TABLE IF EXISTS l_USER_PROGRESS_SEQ;

-- creation
-- Création de la table l_USER
CREATE TABLE IF NOT EXISTS l_USER (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_nom VARCHAR,
    user_prenom VARCHAR,
    user_password VARCHAR
);
-- Création de la table l_SEQUENCES
CREATE TABLE IF NOT EXISTS l_SEQUENCES (
    sequence_id INTEGER PRIMARY KEY AUTOINCREMENT,
    seq_title VARCHAR,
    stage_id INTEGER,
    seq_description VARCHAR,
    seq_content VARCHAR
);
-- Création de la table l_STAGES
CREATE TABLE IF NOT EXISTS l_STAGES (
    stage_id INTEGER PRIMARY KEY AUTOINCREMENT,
    sta_name VARCHAR,
    sta_description VARCHAR
);
-- Création de la table l_EXERCICES
CREATE TABLE IF NOT EXISTS l_EXERCICES (
    exercice_id INTEGER PRIMARY KEY AUTOINCREMENT,
    sequence_id INTEGER,
    exo_type VARCHAR,
    exo_consigne VARCHAR,
    exo_choices TEXT,
    exo_ordre INTEGER
);
-- Création de la table l_USER_PROGRESS
CREATE TABLE IF NOT EXISTS l_USER_PROGRESS (
    progress_id INTEGER PRIMARY KEY AUTOINCREMENT,
    pro_score INT,
    user_id INTEGER,
    exercice_id INTEGER,
    pro_date DATETIME
);
-- Création de la table l_USER_PROGRESS_SEQ
CREATE TABLE IF NOT EXISTS l_USER_PROGRESS_SEQ (
    completed BOOLEAN,
    user_id INTEGER,
    sequence_id INTEGER,
    seq_score INT
);

-- clées etrangères

-- insertions 
-- Insertion de données dans la table l_SEQUENCES
INSERT INTO l_SEQUENCES (
        seq_title,
        stage_id,
        seq_description,
        seq_content
    )
VALUES ('a-e-i', 1, 'Les voyelles', '["a", "e", "i"]'),
    ('o-u-é', 1, 'Les voyelles', '["o", "u", "é"]'),
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
        '[{"value": "la", "image": "null"}, {"value": "le", "image": "null"}, {"value": "li", "image": "null"}, {"value": "ma", "image": "null"}, {"value": "mi", "image": "null"}, {"value": "pe", "image": "null"}]',
        1
    ),
    (
        1,
        'B1',
        'Trouve la bonne syllabe',
        '[{"value": "la", "image": "null"}, {"value": "le", "image": "null"}, {"value": "li", "image": "null"}, {"value": "ma", "image": "null"}, {"value": "mi", "image": "null"}, {"value": "pe", "image": "null"}]',
        2
    ),
    (
        1,
        'C1',
        'Écris la syllabe (avec modèle)',
        '[{"value": "la", "image": "null"}, {"value": "le", "image": "null"}, {"value": "li", "image": "null"}, {"value": "ma", "image": "null"}, {"value": "mi", "image": "null"}, {"value": "pe", "image": "null"}]',
        3
    ),
    (
        1,
        'D1',
        'Trouve les 3 écritures de la même syllabe',
        '[{"value": "la", "image": "null"}, {"value": "le", "image": "null"}, {"value": "li", "image": "null"}, {"value": "ma", "image": "null"}, {"value": "mi", "image": "null"}, {"value": "pe", "image": "null"}]',
        4
    ),
    (
        1,
        'E1',
        'Écris la syllabe (sans modèle)',
        '[{"value": "la", "image": null}, {"value": "le", "image": null}, {"value": "li", "image": null}, {"value": "ma", "image": null}, {"value": "mi", "image": null}, {"value": "pe", "image": null}]',
        5
    ),
    (
        1,
        'G1',
        'Trouve la bonne syllabe le plus vite possible.',
        '[{"value": "la", "image": null}, {"value": "le", "image": null}, {"value": "li", "image": null}, {"value": "ma", "image": null}, {"value": "mi", "image": null}, {"value": "pe", "image": null}]',
        6
    );



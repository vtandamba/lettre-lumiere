-- SQLite
-- Suppression de la table l_SEQUENCES si elle existe
DROP TABLE IF EXISTS l_SEQUENCES;
-- Suppression de la table l_STAGES si elle existe
DROP TABLE IF EXISTS l_STAGES;
-- Suppression de la table l_EXERCICES si elle existe
DROP TABLE IF EXISTS l_EXERCICES;
-- Création de la table l_SEQUENCES
CREATE TABLE IF NOT EXISTS l_SEQUENCES (
    sequence_id INTEGER PRIMARY KEY AUTOINCREMENT,
    seq_title VARCHAR,
    stage_id INTEGER,
    seq_description VARCHAR,
    seq_content VARCHAR,
    seq_medal VARCHAR
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
    exo_complete BOOLEAN,
    exo_content VARCHAR,
    exo_image VARCHAR,
    exo_etiquette VARCHAR,
    exo_ordre INTEGER
);
-- Insertion de données dans la table l_SEQUENCES
INSERT INTO l_SEQUENCES (
        seq_title,
        stage_id,
        seq_description,
        seq_content,
        seq_medal
    )
VALUES (
        'a-e-i',
        1,
        'Les voyelles',
        '["a", "e", "i"]',
        NULL
    ),
    (
        'o-u-é',
        1,
        'Les voyelles',
        '["o", "u", "é"]',
        NULL
    ),
    ('l', 1, 'La lettre L', '["l"]', NULL),
    ('r', 1, 'La lettre R', '["r"]', NULL),
    (
        'lettre muette',
        1,
        'Lettre Muette',
        '["lettre muette"]',
        NULL
    ),
    ('f', 2, 'La lettre F', '["f"]', NULL),
    ('j', 2, 'La lettre J', '["j"]', NULL),
    ('v', 3, 'La lettre V', '["v"]', NULL),
    ('b', 3, 'La lettre B', '["b"]', NULL),
    ('CH', 4, 'CH', '["ch"]', NULL),
    ('P', 4, 'La lettre P', '["p"]', NULL);
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
        exo_complete,
        exo_content,
        exo_image,
        exo_etiquette,
        exo_ordre
    )
VALUES (
        1,
        'A1',
        'Ecoute et répète',
        0,
        '{"choices": ["la", "le", "li", "ma", "mi", "pe"], "answer": null}',
        NULL,
        NULL,
        1
    ),
    (
        1,
        'B1',
        'Trouve la bonne syllabe',
        0,
        '{"choices": ["la", "le", "li", "ma", "mi", "pe"], "answer": null}',
        NULL,
        NULL,
        2
    ),
    (
        1,
        'C1',
        'Écris la syllabe (avec modèle)',
        0,
        '{"choices": ["la", "le", "li", "ma", "mi", "pe"], "answer": null}',
        NULL,
        "la",
        3
    ),
    (
        1,
        'D1',
        'Trouve les 3 écritures de la même syllabe',
        0,
        '{"choices": ["la", "le", "li", "ma", "mi", "pe"], "answer": null}',
        NULL,
        "la",
        4
    ),
    (
        1,
        'E1',
        'Écris la syllabe (sans modèle)',
        0,
        '{"choices": ["la", "le", "li", "ma", "mi", "pe"], "answer": null}',
        NULL,
        "la",
        5
    ),
    (
        1,
        'G1',
        'Trouve la bonne syllabe le plus vite possible.',
        0,
        '{"choices": ["la", "le", "li", "ma", "mi", "pe"], "answer": null}',
        NULL,
        "la",
        6
    );
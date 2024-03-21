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
-- Suppression de la table l_PROGRESS_SEQ si elle existe
DROP TABLE IF EXISTS l_PROGRESS_SEQ;
-- Création de la table l_USER
CREATE TABLE IF NOT EXISTS l_USER (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name VARCHAR,
    user_surname VARCHAR,
    user_password VARCHAR
);
-- Création de la table l_STAGES
CREATE TABLE IF NOT EXISTS l_STAGES (
    stage_id INTEGER PRIMARY KEY AUTOINCREMENT,
    sta_name VARCHAR,
    sta_description VARCHAR
);
-- Création de la table l_SEQUENCES
CREATE TABLE IF NOT EXISTS l_SEQUENCES (
    sequence_id INTEGER PRIMARY KEY AUTOINCREMENT,
    seq_title VARCHAR,
    stage_id INTEGER,
    progress_id INTEGER,
    seq_description VARCHAR,
    seq_content VARCHAR,
    FOREIGN KEY (progress_id) REFERENCES l_PROGRESS_SEQ(progress_id),
    FOREIGN KEY (stage_id) REFERENCES l_STAGES(stage_id)
);
-- Création de la table l_EXERCICES
CREATE TABLE IF NOT EXISTS l_EXERCICES (
    exercice_id INTEGER PRIMARY KEY AUTOINCREMENT,
    sequence_id INTEGER,
    exo_type VARCHAR,
    exo_consigne VARCHAR,
    exo_choices TEXT,
    exo_ordre INTEGER,
    FOREIGN KEY (sequence_id) REFERENCES l_SEQUENCES(sequence_id)
);
-- Création de la table l_USER_PROGRESS
CREATE TABLE IF NOT EXISTS l_USER_PROGRESS (
    progress_id INTEGER PRIMARY KEY AUTOINCREMENT,
    pro_score INT,
    user_id INTEGER,
    exercice_id INTEGER,
    pro_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES l_USER(user_id),
    FOREIGN KEY (exercice_id) REFERENCES l_EXERCICES(exercice_id)
);
-- Création de la table l_PROGRESS_SEQ
CREATE TABLE IF NOT EXISTS l_PROGRESS_SEQ (
    completed BOOLEAN,
    user_id INTEGER,
    sequence_id INTEGER,
    seq_score INT,
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
        progress_id,
        seq_description,
        seq_content
    )
VALUES ('a-e-i', 1, NULL, 'Les voyelles', '["a", "e", "i"]'),
    ('o-u-é', 1, NULL, 'Les voyelles', '["o", "u", "é"]'),
    ('l', 1, NULL, 'La lettre L', '["l"]'),
    ('r', 1, NULL, 'La lettre R', '["r"]'),
    (
        'lettre muette',
        1,
        NULL,
        'Lettre Muette',
        '["lettre muette"]'
    ),
    ('f', 2, NULL, 'La lettre F', '["f"]'),
    ('j', 2, NULL, 'La lettre J', '["j"]'),
    ('v', 3, NULL, 'La lettre V', '["v"]'),
    ('b', 3, NULL, 'La lettre B', '["b"]'),
    ('CH', 4, NULL, 'CH', '["ch"]'),
    ('P', 4, NULL, 'La lettre P', '["p"]');
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
VALUES 
	
	
	(
        2,
        'A1',
        'Ecoute et répète',
        '[{"value": "lé", "image": "null"}, {"value": "lo", "image": "null"}, {"value": "lu", "image": "null"}, {"value": "mo", "image": "null"}, {"value": "mu", "image": "null"}, {"value": "pé", "image": "null"}]',
        1
    ),
    (
        2,
        'B1',
        'Trouve la bonne syllabe',
        '[{"value": "lé", "image": "null"}, {"value": "lo", "image": "null"}, {"value": "lu", "image": "null"}, {"value": "mo", "image": "null"}, {"value": "mu", "image": "null"}, {"value": "pé", "image": "null"}]',
        2
    ),
    (
        2,
        'C1',
        'Écris la syllabe (avec modèle)',
        '[{"value": "lé", "image": "null"}, {"value": "lo", "image": "null"}, {"value": "lu", "image": "null"}, {"value": "mo", "image": "null"}, {"value": "mu", "image": "null"}, {"value": "pé", "image": "null"}]',
        3
    ),
    (
        2,
        'D1',
        'Trouve les 3 écritures de la même syllabe',
        '[{"value": "lé", "image": "null"}, {"value": "lo", "image": "null"}, {"value": "lu", "image": "null"}, {"value": "mo", "image": "null"}, {"value": "mu", "image": "null"}, {"value": "pé", "image": "null"}]',
        4
    ),
    (
        2,
        'E1',
        'Écris la syllabe (sans modèle)',
        '[{"value": "lé", "image": "null"}, {"value": "lo", "image": "null"}, {"value": "lu", "image": "null"}, {"value": "mo", "image": "null"}, {"value": "mu", "image": "null"}, {"value": "pé", "image": "null"}]',
        5
    ),
    (
        2,
        'G1',
        'Trouve la bonne syllabe le plus vite possible.',
        '[{"value": "lé", "image": "null"}, {"value": "lo", "image": "null"}, {"value": "lu", "image": "null"}, {"value": "mo", "image": "null"}, {"value": "mu", "image": "null"}, {"value": "pé", "image": "null"}]',
        6
    ),
	

	
	
	(
        3,
        'A1',
        'Ecoute et répète',
        '[{"value": "la", "image": "null"}, {"value": "le", "image": "null"}, {"value": "li", "image": "null"}, {"value": "ma", "image": "null"}, {"value": "mi", "image": "null"}, {"value": "pe", "image": "null"}]',
        1
    ),
    (
        3,
        'B1',
        'Trouve la bonne syllabe',
        '[{"value": "la", "image": "null"}, {"value": "le", "image": "null"}, {"value": "li", "image": "null"}, {"value": "ma", "image": "null"}, {"value": "mi", "image": "null"}, {"value": "pe", "image": "null"}]',
        2
    ),
    (
        3,
        'C1',
        'Écris la syllabe (avec modèle)',
        '[{"value": "la", "image": "null"}, {"value": "le", "image": "null"}, {"value": "li", "image": "null"}, {"value": "ma", "image": "null"}, {"value": "mi", "image": "null"}, {"value": "pe", "image": "null"}]',
        3
    ),
    (
        3,
        'D1',
        'Trouve les 3 écritures de la même syllabe',
        '[{"value": "la", "image": "null"}, {"value": "le", "image": "null"}, {"value": "li", "image": "null"}, {"value": "ma", "image": "null"}, {"value": "mi", "image": "null"}, {"value": "pe", "image": "null"}]',
        4
    ),
    (
        3,
        'E1',
        'Écris la syllabe (sans modèle)',
        '[{"value": "la", "image": null}, {"value": "le", "image": null}, {"value": "li", "image": null}, {"value": "ma", "image": null}, {"value": "mi", "image": null}, {"value": "pe", "image": null}]',
        5
    ),
    (
        3,
        'G1',
        'Trouve la bonne syllabe le plus vite possible.',
        '[{"value": "la", "image": null}, {"value": "le", "image": null}, {"value": "li", "image": null}, {"value": "ma", "image": null}, {"value": "mi", "image": null}, {"value": "pe", "image": null}]',
        6
    )
	,
    (
        3,
        'A2',
        'Trouve la bonne syllabe le plus vite possible.',
        '[{"value": "salé", "image": "salé.jpg"}, {"value": "sali", "image": "sali.jpg"}, {"value": "lavé", "image": "lavé.jpg"}, {"value": "lune", "image":"lune.jpg" }, {"value": "pile", "image": "pile.jpg"}, {"value": "vélo", "image": "vélo.avif"}]',
        7
    )
	,
    (
        3,
        'B2',
        'Trouve la bonne syllabe le plus vite possible.',
        '[{"value": "salé", "image": "salé.jpg"}, {"value": "sali", "image": "sali.jpg"}, {"value": "lavé", "image": "lavé.jpg"}, {"value": "lune", "image":"lune.jpg" }, {"value": "pile", "image": "pile.jpg"}, {"value": "vélo", "image": "vélo.avif"}]',
        8
    );
	
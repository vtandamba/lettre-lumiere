import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logoLettres from '../assets/images/Logo lettres en lumière.png'; // Assurez-vous que le chemin est correct
import logo from '../assets/images/logoLettresEnLumieres.png'; // Assurez-vous que le chemin est correct

const ProgressionPdf = (props) => {
    const {user, exercises, tabScore } = props
    console.log('Exercices dans PDF:', props.exercises);
    console.log('Scores dans PDF:', props.tabScore);
    console.log('user dans PDF:', props.user);
    const styles = StyleSheet.create({
        page: {
            padding: 30,
            backgroundColor: '#fff', // Arrière-plan coloré
        },
        headerContainer: {
            flexDirection: 'row', // Aligne les éléments horizontalement
            justifyContent: 'space-between', // Espace égal entre les éléments
            alignItems: 'center', // Aligne verticalement au centre
            marginBottom: 20, // Espace sous les logos
        },
        logo: {
            width: 100, // Ajustez la taille du logo
            height: 50, // Ajustez la taille du logo
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
            borderRadius: 8, // Pour des coins arrondis
            backgroundColor: 'rgba(78, 137, 143, 0.28)', // Fond coloré pour la section principale
            paddingBottom: 20, // Espace au bas de la section
        },
        header: {
            padding: '2vw',
            fontSize: 18,
            marginBottom: 10,
            textAlign: 'center', // Centre le texte
            fontWeight: 'bold', // Gras pour les en-têtes
        },
        text: {
            fontSize: 12,
            marginBottom: 5,
        },
        score: {
            fontSize: 12,
            marginBottom: 5,
            color: 'blue', // Pour différencier les scores
        },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.headerContainer}>
                    <Image src={logo} style={styles.logo} />
                    <Image src={logoLettres} style={styles.logo} />
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Nom : {props.user?.username || 'Utilisateur'}</Text>
                    <Text style={styles.header}>Liste des Exercices et Progression</Text>
                    {props.exercises && props.exercises.length > 0 ? (
                        exercises.map((exercise, index) => (
                            <View key={index} style={{ marginBottom: 5 }}>
                                <Text style={styles.text}>
                                    {index + 1}. {exercise.consigne || 'Exercice inconnu'} - Progression: {exercise.order || 0}%
                                </Text>
                                {props.tabScore && props.tabScore[index] !== undefined ? (
                                    <Text style={styles.score}>
                                        Score: {props.tabScore[index] || 'Non disponible'}
                                    </Text>
                                ) : (
                                    <Text style={styles.score}>
                                        Score: Non disponible
                                    </Text>
                                )}
                            </View>
                        ))
                    ) : (
                        <Text style={styles.text}>Aucun exercice enregistré pour le moment.</Text>
                    )}
                </View>
            </Page>
        </Document>
    );
};

export default ProgressionPdf;

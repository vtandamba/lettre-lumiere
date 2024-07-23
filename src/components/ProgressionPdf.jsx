import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logoLettres from '../assets/images/Logo lettres en lumière.png'; // Assurez-vous que le chemin est correct
import logo from '../assets/images/logoLettresEnLumieres.png'; // Assurez-vous que le chemin est correct

const ProgressionPdf = ({ user, exercises, scorebyExo }) => {


    const styles = StyleSheet.create({
        page: {
            padding: 30,
            backgroundColor: '#fff',
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
        },
        logo: {
            width: 100,
            height: 50,
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
            borderRadius: 8,
            backgroundColor: 'rgba(78, 137, 143, 0.28)',
            paddingBottom: 20,
        },
        header: {
            padding: '2vw',
            fontSize: 18,
            marginBottom: 10,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        text: {
            fontSize: 12,
            marginBottom: 5,
        },
        score: {
            fontSize: 12,
            marginBottom: 5,
            color: 'blue',
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
                    <Text style={styles.header}>Nom : {user?.username || 'Utilisateur'}</Text>
                    <Text style={styles.header}>Liste des Exercices et Progression</Text>
                    {exercises && exercises.length > 0 ? (
                        exercises.map((exercise, index) => (
                            <View key={index} style={{ marginBottom: 5 }}>
                                <Text style={styles.text}>
                                    {index + 1}. {exercise.consigne || 'Exercice inconnu'} 
                                </Text>
                                {scorebyExo && scorebyExo[index] !== undefined ? (
                                    <Text style={styles.score}>
                                        Score: {scorebyExo[index] !== null ? scorebyExo[index] : 'Non disponible'}
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


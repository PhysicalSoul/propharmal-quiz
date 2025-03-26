document.addEventListener('DOMContentLoaded', function() {


    const state = {
        // Symptoms
        Eternuement: false,
        Rhinorrhée: false,
        Prurit_nasal: false,
        Obstruction_nasal: false,
        Prurit_oculaire: false,
        Fièvre_Courbatures: false,
        Démangeaisons: false,
        Boutons: false,

        // Factors
        Pollens: false,
        Poussières: false,
        Animaux: false,
        Moisissures: false,
        Froid: false,
        Virus: false,
        Aliments: false,
        Médicaments: false,

        // Quality of life
        Travail_scolaire: false,
        Domestique_loisirs: false,
        Sommeil: false,
        Malaise_vomissements: false,

        // Delays
        less_1h_2h: false,
        more_4h: false,
        less_eq_4w: false,
        more_4w: false,
        less_eq_6w: false,
        more_6w: false,

        // Diagnostics
        Rhinite_allergique: false,
        Rhino_conjonctivite_allergique: false,
        Virose: false,
        Urticaire_allergique_alimentaire: false,
        Urticaire_allergique_médicamenteuse: false,
        Urticaire_non_allergique: false,
        Rhinite_non_allergique: false,

        // Category
        Légère: false,
        Modérée_Sévère: false,
        Intermittente: false,
        Persistante: false,
        Chronique: false,
        Aiguë_non_allergique: false
    };

    const options = document.querySelectorAll('.option');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const analyzeButton = document.querySelector('.analyze-btn');
    const restartButton = document.querySelector('.restart-btn');
    const steps = document.querySelectorAll('.step');
    const panels = document.querySelectorAll('.panel');
    const loader = document.querySelector('.loader');
    const diagnosisResults = document.querySelector('.diagnosis-results');
    const categoryResults = document.querySelector('.category-results');

    options.forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('selected');
            
            const dataValue = this.getAttribute('data-value');
            state[dataValue] = !state[dataValue];
        });
    });

    const timingOptions = document.querySelectorAll("#timing-panel .option");

    timingOptions.forEach(option => {
        option.addEventListener("click", function () {
            timingOptions.forEach(opt => opt.classList.remove("selected"));

            this.classList.add("selected");
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentPanel = this.closest('.panel');
            const nextStep = this.getAttribute('data-next');
            
            currentPanel.classList.remove('active');
            document.getElementById(`${nextStep}-panel`).classList.add('active');
            
            updateSteps(nextStep);
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentPanel = this.closest('.panel');
            const prevStep = this.getAttribute('data-prev');
            
            currentPanel.classList.remove('active');
            document.getElementById(`${prevStep}-panel`).classList.add('active');
            
            updateSteps(prevStep);
        });
    });

    analyzeButton.addEventListener('click', function() {
        document.getElementById('timing-panel').classList.remove('active');
        document.getElementById('results-panel').classList.add('active');
        
        updateSteps('results');
        
        loader.style.display = 'block';
        diagnosisResults.innerHTML = '';
        categoryResults.innerHTML = '';
        
        setTimeout(() => {
            processDiagnostic();
            loader.style.display = 'none';
        }, 900);
    });

    restartButton.addEventListener('click', function() {

        for (let key in state) {
            state[key] = false;
        }
        

        options.forEach(option => {
            option.classList.remove('selected');
        });
        

        document.getElementById('results-panel').classList.remove('active');
        document.getElementById('symptoms-panel').classList.add('active');
        

        updateSteps('symptoms');
        

        diagnosisResults.innerHTML = '';
        categoryResults.innerHTML = '';
    });

    function updateSteps(currentStep) {
        steps.forEach(step => {
            step.classList.remove('active', 'completed');
            
            const stepData = step.getAttribute('data-step');
            
            if (stepData === currentStep) {
                step.classList.add('active');
            } else {

                const steps = ['symptoms', 'factors', 'quality', 'timing', 'results'];
                const currentIndex = steps.indexOf(currentStep);
                const thisIndex = steps.indexOf(stepData);
                
                if (thisIndex < currentIndex) {
                    step.classList.add('completed');
                }
            }
        });
    }

    function processDiagnostic() {

        if(state.Eternuement && state.Rhinorrhée && state.Prurit_nasal && state.Obstruction_nasal && state.Pollens && state.Animaux && state.Moisissures && state.Poussières && state.Froid && state.Virus && state.Fièvre_Courbatures && state.Prurit_oculaire && state.Démangeaisons && state.Boutons && state.Médicaments && state.Aliments){
            diagnosisResults.innerHTML += '<p> Insuffisant </p>';
            document.querySelectorAll('.diagnosis-results p, .diagnosis-results span, .diagnosis-results div')
                .forEach(el => {
                    el.style.color = 'red';
                    el.style.margin = '0 auto';
                    el.style.textAlign = 'center';
                });
            return;
        }

        if(!state.Eternuement && !state.Rhinorrhée && !state.Prurit_nasal && !state.Obstruction_nasal && !state.Pollens && !state.Animaux && !state.Moisissures && !state.Poussières && !state.Froid && !state.Virus && !state.Fièvre_Courbatures && !state.Prurit_oculaire && !state.Démangeaisons && !state.Boutons && !state.Médicaments && !state.Aliments){
            diagnosisResults.innerHTML += '<p> Insuffisant </p>';
            document.querySelectorAll('.diagnosis-results p, .diagnosis-results span, .diagnosis-results div')
                .forEach(el => {
                    el.style.color = 'red';
                    el.style.margin = '0 auto';
                    el.style.textAlign = 'center';
                });

            return;
        }


        let Symptoms_nez = state.Eternuement || state.Rhinorrhée || state.Prurit_nasal || state.Obstruction_nasal;
        
        if (Symptoms_nez && !state.Prurit_oculaire) {
            if ((state.Pollens || state.Animaux || state.Moisissures || state.Poussières) && !state.Froid && !state.Virus) {
                state.Rhinite_allergique = true;
                diagnosisResults.innerHTML += '<p>Rhinite allergique</p>';
            }
        }
        
        if (Symptoms_nez && state.Prurit_oculaire) {
            if ((state.Pollens || state.Animaux || state.Moisissures || state.Poussières) && !state.Froid && !state.Virus) {
                state.Rhino_conjonctivite_allergique = true;
                diagnosisResults.innerHTML += '<p>Rhino-conjonctivite allergique</p>';
            }
        }
        
        if (state.Fièvre_Courbatures) {
            if (state.Froid || state.Virus) {
                state.Virose = true;
                diagnosisResults.innerHTML += '<p>Virose</p>';
            }
        }
        
        if (Symptoms_nez && !state.Prurit_oculaire) {
            if ((state.Pollens || state.Animaux || state.Moisissures || state.Poussières || state.Aliments || state.Médicaments) && state.Froid && !state.Virus) {
                state.Rhinite_non_allergique = true;
                diagnosisResults.innerHTML += '<p>Rhinite non-allergique</p>';
            }
        }
        
        if (state.Démangeaisons) {
            
            if (state.less_1h_2h && state.Aliments) {
                state.Urticaire_allergique_alimentaire = true;
                if(state.Malaise_vomissements){
                    diagnosisResults.innerHTML += '<p>Urticaire allergique alimentaire</p>';
                }else{
                    diagnosisResults.innerHTML += '<p>Urticaire aiguë alimentaire</p>';
                }
            }

            else if (state.less_1h_2h && state.Médicaments) {
                state.Urticaire_allergique_médicamenteuse = true;
                if(state.Malaise_vomissements){
                    diagnosisResults.innerHTML += '<p>Urticaire allergique médicamenteuse</p>';
                }else{
                    diagnosisResults.innerHTML += '<p>Urticaire aiguë médicamenteuse</p>';
                }
            }

            else if ((state.more_4h && state.Aliments) || (state.more_4h && state.Médicaments) && !state.Malaise_vomissements) {
                state.Urticaire_non_allergique = true;
                diagnosisResults.innerHTML += '<p>Urticaire non-allergique</p>';
            }

            else if (!state.less_1h_2h || state.more_4h) {
                state.Urticaire_non_allergique = true;
                diagnosisResults.innerHTML += '<p>Insuffisant</p>';
            }

            else if(!state.less_1h_2h || state.more_4h && !state.Aliments || !state.Médicaments){
                diagnosisResults.innerHTML += '<p>Insuffisant</p>';
            }
        }
        
        if (state.Urticaire_non_allergique) {
            if (state.more_6w) {
                state.Chronique = true;
                categoryResults.innerHTML += '<p>Urticaire non allergique ==> Chronique</p>';
            } else if (state.less_eq_6w) {
                state.Aiguë_non_allergique = true;
                categoryResults.innerHTML += '<p>Urticaire non allergique ==> Aiguë</p>';
            }
        }

        document.querySelectorAll('.diagnosis-results p, .diagnosis-results span, .diagnosis-results div')
        .forEach(el => {
            el.style.color = '#4CAF50';
            el.style.margin = '0 auto';
            el.style.textAlign = 'center';
        });
        
        if (state.Rhinite_non_allergique || state.Rhinite_allergique || state.Rhino_conjonctivite_allergique) {
            if (state.less_eq_4w) {
                state.Intermittente = true;
                categoryResults.innerHTML += '<p>Intermittente</p>';
            } else if (state.more_4w) {
                state.Persistante = true;
                categoryResults.innerHTML += '<p>Persistante</p>';
            }
        }

        document.querySelectorAll('.category-results p, .category-results span, .category-results div')
        .forEach(el => {
            el.style.color = '#dfa609';
            el.style.margin = '0 auto';
            el.style.textAlign = 'center';
        });
        
        if (!state.Rhinite_allergique && !state.Rhino_conjonctivite_allergique && !state.Virose && !state.Rhinite_non_allergique &&
            !state.Urticaire_allergique_alimentaire && !state.Urticaire_allergique_médicamenteuse && !state.Urticaire_non_allergique) {
            diagnosisResults.innerHTML += '<p> Insuffisant </p>';
            document.querySelectorAll('.diagnosis-results p, .diagnosis-results span, .diagnosis-results div')
            .forEach(el => {
                el.style.color = 'red';
                el.style.margin = '0 auto';
                el.style.textAlign = 'center';
            });
        }
    }
    
});
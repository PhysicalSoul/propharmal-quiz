document.addEventListener('DOMContentLoaded', function() {

    let currentLang = 'fr';
    updateLanguageDisplay(currentLang);
    applyTranslation(currentLang);


    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {

            currentLang = currentLang === 'fr' ? 'ar' : 'fr';
            localStorage.setItem('language', currentLang);
            updateLanguageDisplay(currentLang);
            applyTranslation(currentLang);
            

            document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        });
    }

    function updateLanguageDisplay(lang) {
        document.getElementById('current-lang').textContent = lang.toUpperCase();
    }

    function applyTranslation(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key] && translations[key][lang]) {
                element.textContent = translations[key][lang];
            }
        });


        translateStaticElements(lang);


        const inputElements = document.querySelectorAll('input[data-translate-placeholder]');
        inputElements.forEach(input => {
            const key = input.getAttribute('data-translate-placeholder');
            if (translations[key] && translations[key][lang]) {
                input.placeholder = translations[key][lang];
            }
        });
    }

    function translateStaticElements(lang) {

        translateElement('h2', translations.diagnostic_tool_title, lang);
        translateElement('.intro p', translations.intro_text, lang);
        

        translateElement('[data-step="symptoms"] div:last-child', translations.symptoms, lang);
        translateElement('[data-step="factors"] div:last-child', translations.factors, lang);
        translateElement('[data-step="quality"] div:last-child', translations.quality_of_life, lang);
        translateElement('[data-step="timing"] div:last-child', translations.duration, lang);
        translateElement('[data-step="results"] div:last-child', translations.results, lang);
        

        translateElement('#symptoms-panel h3', translations.your_symptoms, lang);
        translateElement('#symptoms-panel p', translations.select_all_symptoms, lang);
        translateElement('#factors-panel h3', translations.triggering_factors, lang);
        translateElement('#factors-panel p', translations.factors_question, lang);
        translateElement('#quality-panel h3', translations.impact_quality_life, lang);
        translateElement('#quality-panel p', translations.symptoms_affect_daily, lang);
        translateElement('#timing-panel h3', translations.duration_symptoms, lang);
        translateElement('#timing-panel p', translations.how_long_symptoms, lang);
        translateElement('#results-panel h3', translations.analysis_results, lang);
        translateElement('.results-disclaimer p', translations.disclaimer, lang);
        

        translateElements('.next-btn', translations.next, lang);
        translateElements('.prev-btn', translations.previous, lang);
        translateElement('.analyze-btn', translations.analyze, lang);
        translateElement('.restart-btn', translations.restart, lang);
        

        translateElement('[data-value="Eternuement"] span', translations.sneezing, lang);
        translateElement('[data-value="Rhinorrhée"] span', translations.runny_nose, lang);
        translateElement('[data-value="Prurit_nasal"] span', translations.itchy_nose, lang);
        translateElement('[data-value="Obstruction_nasal"] span', translations.stuffy_nose, lang);
        translateElement('[data-value="Prurit_oculaire"] span', translations.itchy_eyes, lang);
        translateElement('[data-value="Fièvre_Courbatures"] span', translations.fever_aches, lang);
        translateElement('[data-value="Démangeaisons"] span', translations.itching, lang);
        translateElement('[data-value="Boutons"] span', translations.pimples, lang);
        

        translateElement('[data-value="Pollens"] span', translations.pollens, lang);
        translateElement('[data-value="Poussières"] span', translations.dust, lang);
        translateElement('[data-value="Animaux"] span', translations.animals, lang);
        translateElement('[data-value="Moisissures"] span', translations.mold, lang);
        translateElement('[data-value="Froid"] span', translations.cold, lang);
        translateElement('[data-value="Virus"] span', translations.virus, lang);
        translateElement('[data-value="Aliments"] span', translations.food, lang);
        translateElement('[data-value="Médicaments"] span', translations.medications, lang);
        

        translateElement('[data-value="Travail_scolaire"] span', translations.work_school_discomfort, lang);
        translateElement('[data-value="Domestique_loisirs"] span', translations.domestic_leisure_disruption, lang);
        translateElement('[data-value="Sommeil"] span', translations.sleep_disorders, lang);
        translateElement('[data-value="Malaise_vomissements"] span', translations.discomfort_vomiting, lang);
        

        translateElement('[data-value="less_1h_2h"] span', translations.less_than_1_2_hours, lang);
        translateElement('[data-value="more_4h"] span', translations.more_than_4_hours, lang);
        translateElement('[data-value="less_eq_4w"] span', translations.less_than_or_equal_4_weeks, lang);
        translateElement('[data-value="more_4w"] span', translations.more_than_4_weeks, lang);
        

        translateElement('.copyright', translations.copyright, lang);
    }

    function translateElement(selector, translationObj, lang) {
        const element = document.querySelector(selector);
        if (element && translationObj && translationObj[lang]) {
            element.textContent = translationObj[lang];
        }
    }

    function translateElements(selector, translationObj, lang) {
        const elements = document.querySelectorAll(selector);
        if (elements.length && translationObj && translationObj[lang]) {
            elements.forEach(element => {
                element.textContent = translationObj[lang];
            });
        }
    }
});


const translations = {

    diagnostic_tool_title: {
        fr: "Outil d'aide au diagnostic",
        ar: "أداة المساعدة في التشخيص"
    },
    intro_text: {
        fr: "Sélectionnez vos symptômes et informations pour recevoir une évaluation préliminaire. Cet outil ne remplace pas l'avis d'un professionnel de santé.",
        ar: "حدد الأعراض والمعلومات الخاصة بك لتلقي تقييم أولي. هذه الأداة لا تحل محل استشارة اختصاصي الرعاية الصحية."
    },
    

    symptoms: {
        fr: "Symptômes",
        ar: "الأعراض"
    },
    factors: {
        fr: "Facteurs",
        ar: "العوامل"
    },
    quality_of_life: {
        fr: "Qualité de vie",
        ar: "جودة الحياة"
    },
    duration: {
        fr: "Durée",
        ar: "المدة"
    },
    results: {
        fr: "Résultats",
        ar: "النتائج"
    },
    

    your_symptoms: {
        fr: "Vos symptômes",
        ar: "الأعراض الخاصة بك"
    },
    select_all_symptoms: {
        fr: "Sélectionnez tous les symptômes que vous présentez",
        ar: "حدد جميع الأعراض التي تعاني منها"
    },
    triggering_factors: {
        fr: "Facteurs déclenchants",
        ar: "العوامل المسببة"
    },
    factors_question: {
        fr: "Y a-t-il des facteurs qui déclenchent ou aggravent vos symptômes?",
        ar: "هل هناك عوامل تثير أو تفاقم الأعراض الخاصة بك؟"
    },
    impact_quality_life: {
        fr: "Impact sur la qualité de vie",
        ar: "التأثير على جودة الحياة"
    },
    symptoms_affect_daily: {
        fr: "Comment vos symptômes affectent-ils votre quotidien?",
        ar: "كيف تؤثر الأعراض على حياتك اليومية؟"
    },
    duration_symptoms: {
        fr: "Durée des symptômes",
        ar: "مدة الأعراض"
    },
    how_long_symptoms: {
        fr: "Depuis combien de temps présentez-vous ces symptômes?",
        ar: "منذ متى وأنت تعاني من هذه الأعراض؟"
    },
    analysis_results: {
        fr: "Résultats de l'analyse",
        ar: "نتائج التحليل"
    },
    disclaimer: {
        fr: "Ce diagnostic est fourni à titre informatif uniquement et ne remplace pas l'avis d'un professionnel de la santé. Consultez un médecin pour un diagnostic précis et un traitement approprié.",
        ar: "يتم تقديم هذا التشخيص لأغراض إعلامية فقط ولا يحل محل استشارة اختصاصي الرعاية الصحية. استشر طبيبًا للحصول على تشخيص دقيق وعلاج مناسب."
    },
    

    next: {
        fr: "Suivant",
        ar: "التالي"
    },
    previous: {
        fr: "Précédent",
        ar: "السابق"
    },
    analyze: {
        fr: "Analyser",
        ar: "تحليل"
    },
    restart: {
        fr: "Recommencer",
        ar: "إعادة البدء"
    },
    

    sneezing: {
        fr: "Éternuement",
        ar: "العطس"
    },
    runny_nose: {
        fr: "Nez qui coule",
        ar: "سيلان الأنف"
    },
    itchy_nose: {
        fr: "Nez qui gratte",
        ar: "حكة في الأنف"
    },
    stuffy_nose: {
        fr: "Nez bouché",
        ar: "انسداد الأنف"
    },
    itchy_eyes: {
        fr: "Yeux qui grattent",
        ar: "حكة في العينين"
    },
    fever_aches: {
        fr: "Fièvre / Courbatures",
        ar: "حمى / آلام عضلية"
    },
    itching: {
        fr: "Démangeaisons / Papules",
        ar: " حكة و طفح جلدي"
    },
    pimples: {
        fr: "Boutons",
        ar: "بثور"
    },
    

    pollens: {
        fr: "Pollens",
        ar: "حبوب اللقاح"
    },
    dust: {
        fr: "Poussières",
        ar: "الغبار"
    },
    animals: {
        fr: "Animaux",
        ar: "الحيوانات"
    },
    mold: {
        fr: "Moisissures",
        ar: "العفن"
    },
    cold: {
        fr: "Froid",
        ar: "البرد"
    },
    virus: {
        fr: "Virus",
        ar: "فيروس"
    },
    food: {
        fr: "Aliments",
        ar: "الطعام"
    },
    medications: {
        fr: "Médicaments",
        ar: "الأدوية"
    },
    

    work_school_discomfort: {
        fr: "Gêne au travail ou à l'école",
        ar: "إزعاج في العمل أو المدرسة"
    },
    domestic_leisure_disruption: {
        fr: "Perturbation des activités domestiques ou de loisirs",
        ar: "تعطيل الأنشطة المنزلية أو الترفيهية"
    },
    sleep_disorders: {
        fr: "Troubles du sommeil",
        ar: "اضطرابات النوم"
    },
    discomfort_vomiting: {
        fr: "Malaises ou vomissements",
        ar: "توعك أو قيء"
    },
    

    less_than_1_2_hours: {
        fr: "Moins de 1-2 heures",
        ar: "أقل من 1-2 ساعة"
    },
    more_than_4_hours: {
        fr: "Plus de 4 heures",
        ar: "أكثر من 4 ساعات"
    },
    less_than_or_equal_4_weeks: {
        fr: "Moins ou égal à 4 semaines",
        ar: "أقل من أو يساوي 4 أسابيع"
    },
    more_than_4_weeks: {
        fr: "Plus de 4 semaines",
        ar: "أكثر من 4 أسابيع"
    },
    

    copyright: {
        fr: "© 2025 Propharmal Spa. Tous droits réservés.",
        ar: "© 2025 بروفارمال سبا. جميع الحقوق محفوظة."
    }
};
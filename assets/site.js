(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vh = window.innerHeight;

  /* ================= Sprachen: DE (Original) · EN · FR =================
     Schlüssel = deutscher Originaltext (innerHTML bzw. Attribut), Wert = [Englisch, Französisch] */
  var D = {
    'Hauptnavigation': ['Main navigation', 'Navigation principale'],
    'Highlights': ['Highlights', 'Temps forts'],
    'Galerie': ['Gallery', 'Galerie'],
    'Karriere': ['Career', 'Carrière'],
    'Team': ['Team', 'Équipe'],
    'Partner': ['Partners', 'Partenaires'],
    'Kontakt': ['Contact', 'Contact'],
    'Karate · Kumite −60 kg · Schweizer Nationalkader': ['Karate · Kumite −60 kg · Swiss National Team', 'Karaté · Kumité −60 kg · Équipe nationale suisse'],
    'Präzision statt Kraft.': ['Precision over power.', 'La précision avant la force.'],
    'Ich bin Eric, Karateka aus Sisseln. Viertelfinal an der Europameisterschaft 2026, Nummer 52 der Welt. Mein nächstes Ziel: <b>die Top 32</b>.': ['I’m Eric, a karateka from Sisseln. Quarter-finalist at the 2026 European Championships, world number 52. My next goal: <b>the top 32</b>.', 'Je suis Eric, karatéka de Sisseln. Quart de finale aux Championnats d’Europe 2026, numéro 52 mondial. Mon prochain objectif : <b>le top 32</b>.'],
    'Highlights ansehen': ['See the highlights', 'Voir les temps forts'],
    'Partner werden': ['Become a partner', 'Devenir partenaire'],
    'WKF-Weltrangliste · Elite Kumite −60 kg': ['WKF World Ranking · Senior Kumite −60 kg', 'Classement mondial WKF · Kumité Elite −60 kg'],
    'Nr.': ['No.', 'N°'],
    '840 Ranglistenpunkte · Stand Oktober 2026': ['840 ranking points · as of October 2026', '840 points au classement · état octobre 2026'],
    'Viertelfinal': ['Quarter-final', 'Quart de finale'],
    'EM 2026 in Frankfurt, bestes Elite-Resultat': ['2026 European Championships in Frankfurt, best senior result', 'Championnats d’Europe 2026 à Francfort, meilleur résultat chez les seniors'],
    '5. Platz': ['5th place', '5<sup>e</sup> place'],
    'U21-Weltmeisterschaft 2024 in Venedig': ['2024 U21 World Championships in Venice', 'Championnats du monde U21 2024 à Venise'],
    '<span class="count" data-to="69">69</span> Kämpfe': ['<span class="count" data-to="69">69</span> bouts', '<span class="count" data-to="69">69</span> combats'],
    'auf internationaler WKF-Ebene': ['at international WKF level', 'au niveau international WKF'],
    'Die grössten Momente.': ['The biggest moments.', 'Les plus grands moments.'],
    'Zurück': ['Back', 'Précédent'],
    'Weiter': ['Next', 'Suivant'],
    'Highlights, seitlich wischen': ['Highlights, swipe sideways', 'Temps forts, faire défiler sur le côté'],
    'Mai 2026 · Frankfurt': ['May 2026 · Frankfurt', 'Mai 2026 · Francfort'],
    'Viertelfinal an der Europameisterschaft': ['Quarter-final at the European Championships', 'Quart de finale aux Championnats d’Europe'],
    'Mein bisher stärkstes Resultat bei der Elite. Zwei Siege gegen Europas Spitze, 270 Weltranglistenpunkte.': ['My best senior result so far. Two wins against Europe’s best, 270 world ranking points.', 'Mon meilleur résultat chez les seniors à ce jour. Deux victoires face à l’élite européenne, 270 points au classement mondial.'],
    '«I will get that medal.»': ['“I will get that medal.”', '« I will get that medal. »'],
    'EM<small>Top 8 Europas</small>': ['Top 8<small>in Europe</small>', 'Top 8<small>européen</small>'],
    'Fotos ansehen': ['View photos', 'Voir les photos'],
    'August 2026 · Basel': ['August 2026 · Basel', 'Août 2026 · Bâle'],
    'Sieg an den Basel Open Masters': ['Winner of the Basel Open Masters', 'Victoire aux Basel Open Masters'],
    'Turniersieg im Kumite in Basel, der Stadt meines Vereins. Ganz oben auf dem Podest.': ['Tournament win in kumite in Basel, the home city of my club. Top of the podium.', 'Victoire en kumité à Bâle, la ville de mon club. Tout en haut du podium.'],
    '1.<small>Platz Kumite</small>': ['1st<small>place, kumite</small>', '1<sup>re</sup><small>place en kumité</small>'],
    'Juli 2026 · Guadalajara, Mexiko': ['July 2026 · Guadalajara, Mexico', 'Juillet 2026 · Guadalajara, Mexique'],
    'Drei Siege auf der Weltserie und mit 275 Punkten mein punktestärkstes Turnier bei der Elite.': ['Three wins on the world series and, with 275 points, my highest-scoring senior tournament.', 'Trois victoires sur le circuit mondial et, avec 275 points, mon meilleur tournoi en points chez les seniors.'],
    '3<small>Siege in Mexiko</small>': ['3<small>wins in Mexico</small>', '3<small>victoires au Mexique</small>'],
    'Oktober 2024 · Venedig': ['October 2024 · Venice', 'Octobre 2024 · Venise'],
    '5. Platz an der U21-Weltmeisterschaft': ['5th place at the U21 World Championships', '5<sup>e</sup> place aux Championnats du monde U21'],
    'Vier Siege an der WM und das beste Schweizer Kumite-Resultat des Turniers. Danach erstmals in den Top 10 der U21-Weltrangliste.': ['Four wins at the Worlds and the best Swiss kumite result of the event. Then, for the first time, into the top 10 of the U21 world ranking.', 'Quatre victoires aux Mondiaux et le meilleur résultat suisse en kumité. Puis, pour la première fois, le top 10 du classement mondial U21.'],
    '5.<small>Platz weltweit, U21</small>': ['5th<small>in the world, U21</small>', '5<sup>e</sup><small>mondial, U21</small>'],
    '2025 · Schweiz': ['2025 · Switzerland', '2025 · Suisse'],
    'Schweizer Vizemeister': ['Swiss runner-up', 'Vice-champion suisse'],
    'Nach einem gebrochenen Finger zurückgekommen und aufs Podest der Schweizermeisterschaft gekämpft.': ['Came back from a broken finger and fought my way onto the podium at the Swiss Championships.', 'De retour après une fracture du doigt, jusqu’au podium des Championnats de Suisse.'],
    '2.<small>Platz Schweizermeisterschaft</small>': ['2nd<small>Swiss Championships</small>', '2<sup>e</sup><small>Championnats de Suisse</small>'],
    'Oktober 2025 · Kuala Lumpur': ['October 2025 · Kuala Lumpur', 'Octobre 2025 · Kuala Lumpur'],
    'Karate 1 Series A Malaysia': ['Karate 1 Series A Malaysia', 'Karate 1 Series A Malaisie'],
    'Drei Siege in Kuala Lumpur, dazu ein Trainingslager mit dem Olympia-Team in Malaysia.': ['Three wins in Kuala Lumpur, plus a training camp with the Olympic team in Malaysia.', 'Trois victoires à Kuala Lumpur, plus un camp d’entraînement avec l’équipe olympique en Malaisie.'],
    '3<small>Siege in Asien</small>': ['3<small>wins in Asia</small>', '3<small>victoires en Asie</small>'],
    'Oktober 2023 · Budapest': ['October 2023 · Budapest', 'Octobre 2023 · Budapest'],
    'Erste Elite-Weltmeisterschaft': ['First senior World Championships', 'Premiers Championnats du monde seniors'],
    'EM-Debüt und WM-Selektion bei den Erwachsenen im selben Jahr. Gleichzeitig im Junioren- und im Elite-Nationalkader.': ['Senior European debut and World Championships selection in the same year. In the junior and senior national teams at the same time.', 'Débuts européens et sélection mondiale chez les seniors la même année. Membre à la fois des cadres nationaux juniors et seniors.'],
    'WM<small>Elite-Debüt</small>': ['Worlds<small>senior debut</small>', 'Mondiaux<small>débuts seniors</small>'],
    'August 2015 · Tokio': ['August 2015 · Tokyo', 'Août 2015 · Tokyo'],
    'Vize-Weltmeister mit elf Jahren': ['World runner-up at eleven', 'Vice-champion du monde à onze ans'],
    'Silber im Kata an der WSKF-Weltmeisterschaft in Japan. Der Moment, in dem alles angefangen hat.': ['Silver in kata at the WSKF World Championships in Japan. The moment it all began.', 'Argent en kata aux Championnats du monde WSKF au Japon. Le moment où tout a commencé.'],
    '2.<small>Platz Kata U14</small>': ['2nd<small>kata U14</small>', '2<sup>e</sup><small>kata U14</small>'],
    'Ganz nah dran.': ['Up close.', 'Au plus près.'],
    'Fotos von meinen Turnieren. <b>Zum Vergrössern auf ein Foto tippen.</b>': ['Photos from my tournaments. <b>Tap a photo to enlarge it.</b>', 'Photos de mes tournois. <b>Touchez une photo pour l’agrandir.</b>'],
    'Turnier wählen': ['Choose a tournament', 'Choisir un tournoi'],
    'EM Frankfurt': ['Euros Frankfurt', 'Euro Francfort'],
    '61. Europameisterschaft, Mai 2026 · Viertelfinal, Kumite −60 kg': ['61st European Championships, May 2026 · Quarter-final, kumite −60 kg', '61<sup>es</sup> Championnats d’Europe, mai 2026 · Quart de finale, kumité −60 kg'],
    'Basel Open Masters, August 2026 · 1. Platz Kumite': ['Basel Open Masters, August 2026 · 1st place, kumite', 'Basel Open Masters, août 2026 · 1<sup>re</sup> place en kumité'],
    'Swiss Karate League Züri Oberland, Gossau ZH · September 2026 · 1. Platz': ['Swiss Karate League Züri Oberland, Gossau ZH · September 2026 · 1st place', 'Swiss Karate League Züri Oberland, Gossau ZH · septembre 2026 · 1<sup>re</sup> place'],
    'Eric Timmer konzentriert vor dem Kampf, Kopfhörer im Ohr': ['Eric Timmer focused before the bout, earphones in', 'Eric Timmer concentré avant le combat, écouteurs dans les oreilles'],
    'Eric fixiert seinen Gegner auf der Matte': ['Eric locks eyes on his opponent on the mat', 'Eric fixe son adversaire sur le tatami'],
    'Eric in Kampfstellung, die Hand auf Distanz zum Gegner': ['Eric in fighting stance, keeping his opponent at a distance', 'Eric en garde, à distance de son adversaire'],
    'Eric ruft nach dem Kampf an der EM in Frankfurt': ['Eric shouts after his fight at the European Championships in Frankfurt', 'Eric crie après son combat aux championnats d’Europe à Francfort'],
    'Hoher Fusstritt von Eric': ['High kick by Eric', 'Coup de pied haut d’Eric'],
    'Eric trifft mit einem Fusstritt': ['Eric lands a kick', 'Eric touche d’un coup de pied'],
    'Eric bringt seinen Gegner zu Boden': ['Eric takes his opponent down', 'Eric amène son adversaire au sol'],
    'Lauter Schrei nach dem Wurf': ['A loud shout after the takedown', 'Un cri puissant après la projection'],
    'Der Kampfrichter zeigt auf Eric, der jubelt': ['The referee points to Eric as he celebrates', 'L’arbitre désigne Eric, qui exulte'],
    'Eric jubelt nach einem Treffer': ['Eric celebrates after scoring', 'Eric exulte après un point'],
    'Eric jubelt in der letzten Sekunde des Kampfes': ['Eric celebrates in the final second of the bout', 'Eric exulte dans la dernière seconde du combat'],
    'Eric jubelt mit geballten Fäusten': ['Eric celebrates with clenched fists', 'Eric exulte, poings serrés'],
    'Drehkick von Eric gegen seinen Gegner aus Georgien': ['Spinning kick by Eric against his Georgian opponent', 'Coup de pied retourné d’Eric contre son adversaire géorgien'],
    'Eric mit seinem Coach an der Matte': ['Eric with his coach at the mat', 'Eric avec son coach au bord du tatami'],
    'Eric mit gesenktem Kopf auf dem Stuhl': ['Eric on the chair, head bowed', 'Eric sur la chaise, tête baissée'],
    'Eric und sein Coach nach dem Kampf': ['Eric and his coach after the bout', 'Eric et son coach après le combat'],
    'Stirn an Stirn mit dem Coach': ['Forehead to forehead with his coach', 'Front contre front avec son coach'],
    'Der Coach hält Erics Gesicht in beiden Händen': ['The coach holds Eric’s face in both hands', 'Le coach tient le visage d’Eric entre ses mains'],
    'Eric mit dem Pokal für den 1. Platz Kumite': ['Eric with the trophy for 1st place in kumite', 'Eric avec le trophée de la 1re place en kumité'],
    'Eric im Angriff gegen seinen Gegner': ['Eric attacking his opponent', 'Eric à l’attaque contre son adversaire'],
    'Eric punktet mit einem Fauststoss und schreit': ['Eric scores with a punch and shouts', 'Eric marque d’un coup de poing et crie'],
    'Fusstritt zum Kopf im Halbfinal': ['Kick to the head in the semi-final', 'Coup de pied à la tête en demi-finale'],
    'Siegerehrung mit den Medaillengewinnern': ['Award ceremony with the medallists', 'Remise des prix avec les médaillés'],
    'Eric mit dem Siegerpokal vor dem Basler Rheinpanorama': ['Eric with the winner’s trophy in front of the Basel Rhine panorama', 'Eric avec le trophée du vainqueur devant le panorama du Rhin à Bâle'],
    'Eric mit seiner Medaille an der Swiss Karate League': ['Eric with his medal at the Swiss Karate League', 'Eric avec sa médaille à la Swiss Karate League'],
    'Eric jubelt nach einem Punkt auf Tatami 6': ['Eric celebrates a point on tatami 6', 'Eric exulte après un point sur le tatami 6'],
    'Schlagabtausch im Kumite': ['Exchange of blows in kumite', 'Échange de coups en kumité'],
    'Jubel nach einem Yuko': ['Celebrating a yuko', 'Joie après un yuko'],
    'Eric umarmt einen Karateka nach dem Kampf': ['Eric hugs a karateka after the bout', 'Eric serre un karatéka dans ses bras après le combat'],
    'Siegerehrung an der Swiss Karate League Züri Oberland': ['Award ceremony at the Swiss Karate League Züri Oberland', 'Remise des prix à la Swiss Karate League Züri Oberland'],
    'Alle Fotos:': ['All photos:', 'Toutes les photos :'],
    'Foto in gross': ['Enlarged photo', 'Photo agrandie'],
    'Schliessen': ['Close', 'Fermer'],
    'Vorheriges Foto': ['Previous photo', 'Photo précédente'],
    'Nächstes Foto': ['Next photo', 'Photo suivante'],
    'Weltrangliste': ['World ranking', 'Classement mondial'],
    'Platz 52. Und weiter nach oben.': ['No. 52. And still climbing.', '52<sup>e</sup> place. Et ce n’est pas fini.'],
    'Die WKF-Rangliste zählt die Resultate der letzten zwei Jahre. 2026 habe ich bei der Elite so viele Punkte geholt wie in keiner Saison zuvor.': ['The WKF ranking counts results from the last two years. In 2026 I scored more senior points than in any season before.', 'Le classement WKF tient compte des résultats des deux dernières années. En 2026, j’ai marqué plus de points chez les seniors que lors de toute autre saison.'],
    'Elite Kumite −60 kg': ['Senior kumite −60 kg', 'Kumité Elite −60 kg'],
    'Position in der Weltrangliste, Platz 1 bis 100': ['World ranking position, places 1 to 100', 'Position au classement mondial, places 1 à 100'],
    'Ziel: Top 32': ['Goal: top 32', 'Objectif : top 32'],
    'Heute: Nr. 52': ['Today: No. 52', 'Aujourd’hui : n° 52'],
    'Punkte 2026 nach Turnier': ['2026 points by tournament', 'Points 2026 par tournoi'],
    'Aktuell gewertete Weltranglistenpunkte': ['World ranking points currently counted', 'Points actuellement pris en compte au classement mondial'],
    'Frankfurt (GER), Europameisterschaft': ['Frankfurt (GER), European Championships', 'Francfort (GER), Championnats d’Europe'],
    'Tbilisi (GEO), Karate 1': ['Tbilisi (GEO), Karate 1', 'Tbilissi (GEO), Karate 1'],
    'A Coruña (ESP), Karate 1': ['A Coruña (ESP), Karate 1', 'La Corogne (ESP), Karate 1'],
    'Salzburg (AUT), Karate 1': ['Salzburg (AUT), Karate 1', 'Salzbourg (AUT), Karate 1'],
    'Vom Fricktal auf die Weltbühne.': ['From the Fricktal to the world stage.', 'Du Fricktal à la scène mondiale.'],
    'Viertelfinal an der Europameisterschaft in Frankfurt <span>· bestes Elite-Resultat</span>': ['Quarter-final at the European Championships in Frankfurt <span>· best senior result</span>', 'Quart de finale aux Championnats d’Europe à Francfort <span>· meilleur résultat chez les seniors</span>'],
    'Karate 1 Series A in Guadalajara, Mexiko <span>· 3 Siege</span>': ['Karate 1 Series A in Guadalajara, Mexico <span>· 3 wins</span>', 'Karate 1 Series A à Guadalajara, Mexique <span>· 3 victoires</span>'],
    'Sieg an den Basel Open Masters <span>· 1. Platz Kumite</span>': ['Winner of the Basel Open Masters <span>· 1st place, kumite</span>', 'Victoire aux Basel Open Masters <span>· 1<sup>re</sup> place en kumité</span>'],
    'Sieg an der Swiss Karate League Züri Oberland in Gossau <span>· 1. Platz</span>': ['Win at the Swiss Karate League Züri Oberland in Gossau <span>· 1st place</span>', 'Victoire à la Swiss Karate League Züri Oberland à Gossau <span>· 1re place</span>'],
    'Karate 1 Series A in Tbilisi, A Coruña und Salzburg': ['Karate 1 Series A in Tbilisi, A Coruña and Salzburg', 'Karate 1 Series A à Tbilissi, La Corogne et Salzbourg'],
    'Schweizer Vizemeister <span>· nach Comeback vom Fingerbruch</span>': ['Swiss runner-up <span>· after coming back from a broken finger</span>', 'Vice-champion suisse <span>· après une fracture du doigt</span>'],
    'Karate 1 Series A in Kuala Lumpur <span>· 3 Siege</span>': ['Karate 1 Series A in Kuala Lumpur <span>· 3 wins</span>', 'Karate 1 Series A à Kuala Lumpur <span>· 3 victoires</span>'],
    'Trainingslager mit dem Olympia-Team in Malaysia': ['Training camp with the Olympic team in Malaysia', 'Camp d’entraînement avec l’équipe olympique en Malaisie'],
    'Europameisterschaft in Yerevan, Armenien': ['European Championships in Yerevan, Armenia', 'Championnats d’Europe à Erevan, Arménie'],
    'WM-Qualifikation in Paris <span>· nur knapp verpasst</span>': ['World Championships qualifier in Paris <span>· narrowly missed</span>', 'Qualification mondiale à Paris <span>· manquée de peu</span>'],
    '5. Platz an der U21-Weltmeisterschaft in Venedig <span>· erstmals Top 10 U21</span>': ['5th place at the U21 World Championships in Venice <span>· first time in the U21 top 10</span>', '5<sup>e</sup> place aux Championnats du monde U21 à Venise <span>· premier top 10 U21</span>'],
    'U21-Europameisterschaft in Tbilisi, Georgien': ['U21 European Championships in Tbilisi, Georgia', 'Championnats d’Europe U21 à Tbilissi, Géorgie'],
    'U21-Europameisterschaft in Zypern': ['U21 European Championships in Cyprus', 'Championnats d’Europe U21 à Chypre'],
    '9. Platz an der Europameisterschaft in Zadar, Kroatien': ['9th place at the European Championships in Zadar, Croatia', '9<sup>e</sup> place aux Championnats d’Europe à Zadar, Croatie'],
    'Europameisterschaft in Zadar, Kroatien': ['European Championships in Zadar, Croatia', 'Championnats d’Europe à Zadar, Croatie'],
    'Karate 1 Series A in Salzburg': ['Karate 1 Series A in Salzburg', 'Karate 1 Series A à Salzbourg'],
    'Internationales Trainingslager in Deutschland': ['International training camp in Germany', 'Camp d’entraînement international en Allemagne'],
    'Elite-Weltmeisterschaft in Budapest': ['Senior World Championships in Budapest', 'Championnats du monde seniors à Budapest'],
    'EM-Debüt bei der Elite in Guadalajara, Spanien': ['Senior European Championships debut in Guadalajara, Spain', 'Débuts aux Championnats d’Europe seniors à Guadalajara, Espagne'],
    'Gleichzeitig im Junioren- und im Elite-Nationalkader': ['In the junior and senior national teams at the same time', 'Membre à la fois des cadres nationaux juniors et seniors'],
    'Erster Start auf der Karate-1-Weltserie der Erwachsenen <span>· Türkei und Indonesien</span>': ['First start on the senior Karate 1 world series <span>· Turkey and Indonesia</span>', 'Premier départ sur le circuit mondial Karate 1 seniors <span>· Turquie et Indonésie</span>'],
    'Dreifacher World-Series-Sieger U16 <span>· inklusive Team-Gold</span>': ['Three-time World Series winner U16 <span>· including team gold</span>', 'Triple vainqueur des World Series U16 <span>· dont l’or par équipe</span>'],
    'Vize-Weltmeister Kata U14 an der WSKF-WM in Tokio': ['World runner-up in kata U14 at the WSKF Worlds in Tokyo', 'Vice-champion du monde de kata U14 aux Mondiaux WSKF à Tokyo'],
    'Start': ['Start', 'Débuts'],
    'Mit sechs Jahren erstes Training beim Karateclub Laufenburg': ['First training session at the age of six at Karateclub Laufenburg', 'Premier entraînement à six ans au Karateclub Laufenburg'],
    'Niemand gewinnt allein.': ['Nobody wins alone.', 'Personne ne gagne seul.'],
    'Rund zehn Trainings pro Woche, dazu Mentaltraining, Physio und eine kaufmännische Lehre. Das geht nur mit diesen Menschen und Orten.': ['Around ten training sessions a week, plus mental training, physio and a commercial apprenticeship. That only works thanks to these people and places.', 'Une dizaine d’entraînements par semaine, plus la préparation mentale, la physio et un apprentissage commercial. C’est possible uniquement grâce à ces personnes et à ces lieux.'],
    'Verein': ['Club', 'Club'],
    'Heimatverein': ['Home club', 'Club d’origine'],
    'Verband': ['Federation', 'Fédération'],
    'Trainer': ['Coaches', 'Entraîneurs'],
    'Mentalcoach': ['Mental coach', 'Coach mental'],
    'Physiotherapie': ['Physiotherapy', 'Physiothérapie'],
    'Ausbildung': ['Education', 'Formation'],
    'Fotografie': ['Photography', 'Photographie'],
    'Mein Trainingsort für die Wettkampfvorbereitung.': ['Where I train for competition.', 'Mon lieu d’entraînement pour préparer les compétitions.'],
    'Hier habe ich mit sechs Jahren angefangen.': ['Where I started at the age of six.', 'C’est ici que j’ai commencé, à six ans.'],
    'Mitglied des Elite-Nationalkaders.': ['Member of the senior national team.', 'Membre du cadre national élite.'],
    'Sie begleiten mich seit Jahren auf jedem Schritt.': ['They have been with me every step of the way for years.', 'Ils m’accompagnent à chaque étape depuis des années.'],
    'Hat mir geholfen, unter Druck ruhig zu bleiben.': ['Helped me stay calm under pressure.', 'M’a aidé à rester calme sous pression.'],
    'Physio Henrich hält meinen Körper wettkampfbereit.': ['Physio Henrich keeps my body ready to compete.', 'Physio Henrich garde mon corps prêt pour la compétition.'],
    'KV-Lehre mit Sport Academy Zurich': ['Commercial apprenticeship with Sport Academy Zurich', 'Apprentissage commercial avec la Sport Academy Zurich'],
    'Kaufmann EFZ Dienstleistung und Administration, praktischer Teil bei der Securitas AG. Spitzensport und Beruf unter einem Dach.': ['Swiss federal diploma in business (services and administration), with the practical part at Securitas AG. Elite sport and career under one roof.', 'Employé de commerce CFC, services et administration, avec la partie pratique chez Securitas AG. Sport d’élite et métier sous un même toit.'],
    'Fotos und Videos von meinen Wettkämpfen.': ['Photos and videos of my competitions.', 'Photos et vidéos de mes compétitions.'],
    'Danke für euren Support.': ['Thank you for your support.', 'Merci pour votre soutien.'],
    'Schweizer Sporthilfe': ['Schweizer Sporthilfe', 'Aide sportive suisse'],
    'Förderung': ['Funding', 'Soutien'],
    'Ausrüstung': ['Equipment', 'Équipement'],
    'Markenbotschafter': ['Brand ambassador', 'Ambassadeur de marque'],
    'Kampfsport-Fachhandel': ['Martial arts retailer', 'Magasin spécialisé en arts martiaux'],
    'Mentaltraining': ['Mental training', 'Préparation mentale'],
    'Startseite': ['Home', 'Accueil'],
    'Erfolge': ['Achievements', 'Palmarès'],
    'Menü': ['Menu', 'Menu'],
    'Seiten': ['Pages', 'Pages'],
    'Entdecke mehr': ['Discover more', 'Découvrir'],
    'Alles über mich.': ['All about me.', 'Tout sur moi.'],
    'Highlights, Weltrangliste und Karriere': ['Highlights, world ranking and career', 'Temps forts, classement mondial et carrière'],
    'Fotos von der EM, den Basel Open Masters und der SKL': ['Photos from the Euros, the Basel Open Masters and the SKL', 'Photos de l’Euro, des Basel Open Masters et de la SKL'],
    'Mentalcoach, Physio und Verein': ['Mental coach, physio and club', 'Coach mental, physio et club'],
    'Die Firmen und Institutionen hinter mir': ['The companies and institutions behind me', 'Les entreprises et institutions qui me soutiennent'],
    'Unterstütze mich ab CHF 50': ['Support me from CHF 50', 'Soutenez-moi dès CHF 50'],
    'Ansehen': ['View', 'Voir'],
    'Gönnerclub': ['Supporters’ Club', 'Club des supporters'],
    'Werde Teil meines Gönnerclubs.': ['Join my supporters’ club.', 'Rejoignez mon club des supporters.'],
    'Weltcups, Trainingslager und Ausrüstung kosten viel. Neben meiner Lehre ist jeder Beitrag eine echte Hilfe auf dem Weg an die Weltspitze. Mit deiner Unterstützung bist du Teil dieses Wegs.': ['World series events, training camps and equipment cost a lot. Alongside my apprenticeship, every contribution is a real help on the way to the top of the world. With your support, you become part of that journey.', 'Les tournois du circuit mondial, les camps d’entraînement et l’équipement coûtent cher. En parallèle de mon apprentissage, chaque contribution m’aide vraiment sur le chemin du sommet mondial. Avec votre soutien, vous faites partie de ce parcours.'],
    'Stufe wählen': ['Choose a level', 'Choisir un niveau'],
    'Kleiner Zustupf': ['Small boost', 'Petit coup de pouce'],
    'einmalig': ['one-off', 'une fois'],
    'pro Jahr': ['per year', 'par an'],
    'Ein persönliches Dankeschön von mir': ['A personal thank-you from me', 'Un remerciement personnel de ma part'],
    'Mitglied im Gönnerclub<br>Signierte Autogrammkarte': ['Member of the supporters’ club<br>Signed autograph card', 'Membre du club des supporters<br>Carte autographe signée'],
    'Silber': ['Silver', 'Argent'],
    'Gold': ['Gold', 'Or'],
    'Auswählen': ['Select', 'Choisir'],
    'Deine Wahl': ['Your choice', 'Votre choix'],
    'Wähle oben eine Stufe.': ['Choose a level above.', 'Choisissez un niveau ci-dessus.'],
    'Jetzt anmelden': ['Sign up now', 'S’inscrire maintenant'],
    'Nachricht schreiben': ['Write a message', 'Écrire un message'],
    'Schreib mir': ['Write to me', 'Écrivez-moi'],
    'Ich melde mich so schnell wie möglich bei dir.': ['I’ll get back to you as soon as possible.', 'Je vous réponds dès que possible.'],
    'Name': ['Name', 'Nom'],
    'E-Mail': ['Email', 'E-mail'],
    'Thema': ['Topic', 'Sujet'],
    'Medien': ['Media', 'Médias'],
    'Training': ['Training', 'Entraînement'],
    'Anderes': ['Other', 'Autre'],
    'Nachricht': ['Message', 'Message'],
    'Nachricht senden': ['Send message', 'Envoyer le message'],
    'Deine Nachricht wird über den Formular-Dienst Web3Forms an mein E-Mail-Postfach weitergeleitet.': ['Your message is forwarded to my inbox via the form service Web3Forms.', 'Votre message est transmis à ma boîte e-mail via le service de formulaires Web3Forms.'],
    'Danke!': ['Thank you!', 'Merci !'],
    'Deine Nachricht ist unterwegs. Ich melde mich bald bei dir.': ['Your message is on its way. I’ll get back to you soon.', 'Votre message est en route. Je vous réponds bientôt.'],
    'Schreib mir deinen Namen und deine Adresse, damit ich mich persönlich bei dir bedanken kann.': ['Include your name and address so I can thank you personally.', 'Indiquez votre nom et votre adresse pour que je puisse vous remercier personnellement.'],
    'Oder direkt an': ['Or write directly to', 'Ou directement à'],
    'Bezahlen': ['Payment', 'Paiement'],
    'Bank': ['Bank', 'Banque'],
    'Kontoinhaber': ['Account holder', 'Titulaire du compte'],
    'Vermerk: «Gönnerclub» und dein Name.': ['Reference: “Supporters’ Club” and your name.', 'Communication : « Club des supporters » et votre nom.'],
    'Werde Teil des Teams.': ['Join the team.', 'Rejoignez l’équipe.'],
    'Ich suche Partner, die den Weg in die Weltspitze mitgehen wollen. Dafür biete ich echte Sichtbarkeit und eine Geschichte, die Menschen berührt.': ['I’m looking for partners who want to join me on the way to the world’s top. In return I offer real visibility and a story that moves people.', 'Je cherche des partenaires prêts à m’accompagner jusqu’au sommet mondial. En retour, j’offre une vraie visibilité et une histoire qui touche les gens.'],
    "12'400": ['12,400', '12 400'],
    'Follower auf Instagram, mit Wettkampf-Videos aus ganz Europa und der Welt.': ['followers on Instagram, with competition videos from all over Europe and the world.', 'abonnés sur Instagram, avec des vidéos de compétition de toute l’Europe et du monde.'],
    'Länder, in denen ich international gekämpft habe, von Georgien über Malaysia bis Mexiko.': ['countries where I have competed internationally, from Georgia to Malaysia and Mexico.', 'pays où j’ai combattu à l’international, de la Géorgie à la Malaisie en passant par le Mexique.'],
    'Sauberer Sport aus Überzeugung. Jede Nahrungsergänzung prüfe ich mit Antidoping Schweiz.': ['Clean sport out of conviction. I check every supplement with Antidoping Switzerland.', 'Un sport propre par conviction. Je vérifie chaque complément alimentaire auprès d’Antidoping Suisse.'],
    'Lass uns reden.': ['Let’s talk.', 'Parlons-en.'],
    'Für Sponsoring, Medien oder Trainingskooperationen. Am schnellsten per E-Mail.': ['For sponsorship, media or training partnerships. Email is the fastest way to reach me.', 'Pour le sponsoring, les médias ou les collaborations d’entraînement. Le plus rapide : par e-mail.'],
    'Kopieren': ['Copy', 'Copier'],
    'WKF-Profil': ['WKF profile', 'Profil WKF'],
    'Eric Timmer · Sisseln AG · Jahrgang 2003': ['Eric Timmer · Sisseln, Switzerland · born 2003', 'Eric Timmer · Sisseln (AG), Suisse · né en 2003'],
    'Ranglistendaten: WKF-Athletenprofil (Stand Oktober 2026). Weitere Resultate: Swiss Karate Federation, Stiftung Schweizer Sporthilfe.': ['Ranking data: WKF athlete profile (as of October 2026). Other results: Swiss Karate Federation, Stiftung Schweizer Sporthilfe.', 'Données de classement : profil d’athlète WKF (état octobre 2026). Autres résultats : Swiss Karate Federation, Aide sportive suisse.'],
    'Fotos: Kjetil Waber, foto-kjetil.ch.': ['Photos: Kjetil Waber, foto-kjetil.ch.', 'Photos : Kjetil Waber, foto-kjetil.ch.'],
    'Sisseln AG · Jahrgang 2003 · Kaufmann EFZ in Ausbildung': ['Sisseln AG · born 2003 · commercial apprentice (KV)', 'Sisseln AG · né en 2003 · apprenti employé de commerce'],
    'Eric Timmer im Dress der Swiss Karate Federation': ['Eric Timmer in the Swiss Karate Federation team jacket', 'Eric Timmer dans la veste de la Swiss Karate Federation'],
    'Foto: <a href="https://foto-kjetil.ch" target="_blank" rel="noopener">Kjetil Waber</a>': ['Photo: <a href="https://foto-kjetil.ch" target="_blank" rel="noopener">Kjetil Waber</a>', 'Photo : <a href="https://foto-kjetil.ch" target="_blank" rel="noopener">Kjetil Waber</a>'],
    "Impressum": ["Legal notice", "Mentions légales"],
    "Impressum.": ["Legal notice.", "Mentions légales."],
    "Verantwortlich für diese Webseite": ["Responsible for this website", "Responsable de ce site"],
    "Eric Timmer<br>4334 Sisseln, Schweiz": ["Eric Timmer<br>4334 Sisseln, Switzerland", "Eric Timmer<br>4334 Sisseln, Suisse"],
    "E-Mail: <a href=\"mailto:e.timmer@gmx.ch\">e.timmer@gmx.ch</a>": ["Email: <a href=\"mailto:e.timmer@gmx.ch\">e.timmer@gmx.ch</a>", "E-mail : <a href=\"mailto:e.timmer@gmx.ch\">e.timmer@gmx.ch</a>"],
    "Inhalt": ["Content", "Contenu"],
    "Diese Webseite stellt mich als Sportler vor: meine Resultate, mein Team und meine Partner. Ich erstelle die Inhalte mit Sorgfalt, übernehme aber keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität. Ranglistendaten stammen aus dem WKF-Athletenprofil.": ["This website presents me as an athlete: my results, my team and my partners. I create the content with care, but I do not guarantee that it is correct, complete or up to date. Ranking data comes from the WKF athlete profile.", "Ce site me présente en tant que sportif : mes résultats, mon équipe et mes partenaires. Je crée les contenus avec soin, mais je ne garantis ni leur exactitude, ni leur exhaustivité, ni leur actualité. Les données de classement proviennent du profil d’athlète WKF."],
    "Bilder und Marken": ["Images and trademarks", "Images et marques"],
    "Die Fotos stammen von Kjetil Waber (foto-kjetil.ch). Sie dürfen ohne Zustimmung nicht weiterverwendet werden. Logos und Namen der Partner gehören den jeweiligen Inhabern.": ["The photos are by Kjetil Waber (foto-kjetil.ch). They may not be reused without permission. Partner logos and names belong to their respective owners.", "Les photos sont de Kjetil Waber (foto-kjetil.ch). Elles ne peuvent pas être réutilisées sans autorisation. Les logos et noms des partenaires appartiennent à leurs propriétaires respectifs."],
    "Links auf andere Seiten": ["Links to other sites", "Liens vers d’autres sites"],
    "Für Inhalte externer Webseiten, auf die ich verlinke, sind allein deren Betreiber verantwortlich.": ["The operators of the external websites I link to are solely responsible for their content.", "Les exploitants des sites externes vers lesquels je renvoie sont seuls responsables de leur contenu."],
    "Datenschutz": ["Privacy policy", "Protection des données"],
    "Datenschutz.": ["Privacy policy.", "Protection des données."],
    "Kurz gesagt: Ich verwende keine Cookies, kein Tracking und keine Werbung. Personendaten bearbeite ich nur, wenn du mir schreibst oder dem Gönnerclub beitrittst. Stand: Oktober 2026.": ["In short: I use no cookies, no tracking and no advertising. I only process personal data when you write to me or join the supporters’ club. As of October 2026.", "En bref : je n’utilise ni cookies, ni suivi, ni publicité. Je ne traite des données personnelles que lorsque tu m’écris ou rejoins le club des supporters. État : octobre 2026."],
    "Verantwortlicher": ["Controller", "Responsable"],
    "Eric Timmer, 4334 Sisseln, Schweiz. E-Mail: <a href=\"mailto:e.timmer@gmx.ch\">e.timmer@gmx.ch</a>": ["Eric Timmer, 4334 Sisseln, Switzerland. Email: <a href=\"mailto:e.timmer@gmx.ch\">e.timmer@gmx.ch</a>", "Eric Timmer, 4334 Sisseln, Suisse. E-mail : <a href=\"mailto:e.timmer@gmx.ch\">e.timmer@gmx.ch</a>"],
    "Hosting": ["Hosting", "Hébergement"],
    "Die Webseite wird über GitHub Pages (GitHub Inc., USA) ausgeliefert. Beim Aufruf verarbeitet GitHub technisch notwendige Daten wie deine IP-Adresse, damit die Seite angezeigt werden kann.": ["The website is delivered via GitHub Pages (GitHub Inc., USA). When you visit it, GitHub processes technically necessary data such as your IP address so that the page can be displayed.", "Le site est diffusé via GitHub Pages (GitHub Inc., États-Unis). Lors de la visite, GitHub traite des données techniquement nécessaires, comme ton adresse IP, afin d’afficher la page."],
    "Schriftart": ["Font", "Police"],
    "Die Schriftart wird von Google Fonts (Google, USA) geladen. Dabei erhält Google deine IP-Adresse.": ["The font is loaded from Google Fonts (Google, USA). Google receives your IP address in the process.", "La police est chargée depuis Google Fonts (Google, États-Unis). Google reçoit alors ton adresse IP."],
    "Kontaktfenster": ["Contact window", "Fenêtre de contact"],
    "Wenn du mir über das Kontaktfenster schreibst, übermittle ich Name, E-Mail-Adresse, Thema und Nachricht über den Dienst Web3Forms an mein E-Mail-Postfach. Ich verwende diese Angaben nur, um dir zu antworten.": ["When you write to me via the contact window, your name, email address, topic and message are sent through the service Web3Forms to my inbox. I only use this information to reply to you.", "Lorsque tu m’écris via la fenêtre de contact, ton nom, ton adresse e-mail, le sujet et ton message sont transmis par le service Web3Forms à ma boîte e-mail. J’utilise ces informations uniquement pour te répondre."],
    "Gönnerclub": ["Supporters’ club", "Club des supporters"],
    "Wenn du dem Gönnerclub beitrittst, gibst du im Anmeldeformular Vorname, Nachname, E-Mail-Adresse, Postadresse und freiwillig deine Telefonnummer an. Diese Angaben übermittle ich über den Dienst Web3Forms an mein E-Mail-Postfach und verwende sie nur, um mich bei dir zu bedanken und dir die Gönner-Updates zu schicken. Die Zahlung erfolgt per TWINT oder Banküberweisung. Ich sehe dabei die Angaben, die dein Zahlungsdienst oder deine Bank mitliefert.": ["If you join the supporters’ club, you enter your first name, last name, email address, postal address and, optionally, your phone number in the sign-up form. I forward these details to my email inbox via the service Web3Forms and use them only to thank you and to send you the supporter updates. Payment is made by TWINT or bank transfer. I see the details that your payment provider or bank passes on.", "Si tu rejoins le club des supporters, tu indiques dans le formulaire d’inscription ton prénom, ton nom, ton adresse e-mail, ton adresse postale et, facultativement, ton numéro de téléphone. Je transmets ces informations à ma boîte e-mail via le service Web3Forms et ne les utilise que pour te remercier et t’envoyer les nouvelles des supporters. Le paiement se fait par TWINT ou virement bancaire. Je vois les informations que ton prestataire de paiement ou ta banque transmet."],
    "Lokale Speicherung": ["Local storage", "Stockage local"],
    "Deine gewählte Sprache wird in deinem Browser gespeichert (Local Storage), damit sie beim nächsten Besuch erhalten bleibt. Das ist kein Cookie und wird nicht an mich übermittelt.": ["Your chosen language is stored in your browser (local storage) so that it is kept for your next visit. This is not a cookie and is not sent to me.", "La langue choisie est enregistrée dans ton navigateur (stockage local) afin d’être conservée lors de ta prochaine visite. Ce n’est pas un cookie et elle ne m’est pas transmise."],
    "Deine Rechte": ["Your rights", "Tes droits"],
    "Du kannst jederzeit Auskunft über deine Daten verlangen sowie deren Berichtigung oder Löschung. Schreib mir dazu an <a href=\"mailto:e.timmer@gmx.ch\">e.timmer@gmx.ch</a>.": ["You can request information about your data at any time, as well as its correction or deletion. Write to me at <a href=\"mailto:e.timmer@gmx.ch\">e.timmer@gmx.ch</a>.", "Tu peux à tout moment demander des informations sur tes données, ainsi que leur rectification ou leur suppression. Écris-moi à <a href=\"mailto:e.timmer@gmx.ch\">e.timmer@gmx.ch</a>."],
    "Stufe wählen": ["Choose a tier", "Choisis un niveau"],
    "Dein Beitrag zählt.": ["Every contribution counts.", "Chaque contribution compte."],
    "Danke, dass du mich auf diesem Weg unterstützt.": ["Thank you for supporting me on this journey.", "Merci de me soutenir sur ce chemin."],
    "Du führst ein Unternehmen?": ["Do you run a company?", "Tu diriges une entreprise ?"],
    "Dann schau dir an, wie du mich als Partner unterstützen kannst.": ["Then take a look at how you can support me as a partner.", "Alors découvre comment tu peux me soutenir en tant que partenaire."],
    "Mitglied im Gönnerclub<br>Signierte Autogrammkarte<br>Nennung auf der Webseite (wenn gewünscht)": ["Member of the supporters’ club<br>Signed autograph card<br>Name on the website (if you like)", "Membre du club des supporters<br>Carte autographe signée<br>Nom sur le site (si tu le souhaites)"],
    "Mitglied im Gönnerclub<br>Signierte Autogrammkarte<br>Nennung auf der Webseite (wenn gewünscht)<br>Signiertes Trikot oder Gi-Patch": ["Member of the supporters’ club<br>Signed autograph card<br>Name on the website (if you like)<br>Signed jersey or gi patch", "Membre du club des supporters<br>Carte autographe signée<br>Nom sur le site (si tu le souhaites)<br>Maillot ou patch de gi signé"],
    "Mitglied im Gönnerclub<br>Alles von Gold": ["Member of the supporters’ club<br>Everything from Gold", "Membre du club des supporters<br>Tout ce qu’offre le niveau Or"],
    "Platin": ["Platinum", "Platine"],
    "Mitglied im Gönnerclub": ["Member of the supporters’ club", "Membre du club des supporters"],
    "Signierte Autogrammkarte": ["Signed autograph card", "Carte autographe signée"],
    "Nennung auf der Webseite (wenn gewünscht)": ["Name on the website (if you like)", "Nom sur le site (si tu le souhaites)"],
    "Signiertes Trikot oder Gi-Patch": ["Signed jersey or gi patch", "Maillot ou patch de gi signé"],
    "Alles von Gold": ["Everything from Gold", "Tout ce qu’offre le niveau Or"],
    "Ein persönliches Dankeschön von mir": ["A personal thank-you from me", "Un remerciement personnel de ma part"],
    "Danke an": ["Thanks to", "Merci à"],
    "Diese Menschen unterstützen mich.": ["These people support me.", "Ces personnes me soutiennent."],
    "WM Venedig 2024": ["World Champs Venice 2024", "Mondial Venise 2024"],
    "U21-Weltmeisterschaft, Jesolo/Venedig, Oktober 2024 · 5. Platz": ["U21 World Championships, Jesolo/Venice, October 2024 · 5th place", "Championnats du monde U21, Jesolo/Venise, octobre 2024 · 5<sup>e</sup> place"],
    "Eric jubelt nach einem Yuko, auf der Anzeigetafel zwei rote Flaggen": ["Eric celebrates a yuko, two red flags on the scoreboard", "Eric exulte après un yuko, deux drapeaux rouges au tableau"],
    "Eric schreit seinen Kampfgeist heraus, im Hintergrund das WKF-Logo und Venedig": ["Eric lets out a battle cry, the WKF logo and Venice behind him", "Eric pousse un cri de combat, le logo WKF et Venise en arrière-plan"],
    "Eric in Kampfstellung im Kumite, das Schweizer Wappen auf dem Gi": ["Eric in fighting stance in kumite, the Swiss crest on his gi", "Eric en garde en kumite, l’écusson suisse sur le kimono"],
    "Eric hebt nach dem Kampf die Faust": ["Eric raises his fist after the bout", "Eric lève le poing après le combat"],
    "Eric kniet auf der Matte und streckt beide Hände zum Himmel": ["Eric kneels on the mat, both hands raised to the sky", "Eric à genoux sur le tatami, les deux mains levées vers le ciel"],
    "Der Coach hält Erics Gesicht in beiden Händen": ["The coach holds Eric’s face in both hands", "Le coach tient le visage d’Eric entre ses mains"],
    "Eric in der Umarmung nach dem Kampf": ["Eric in an embrace after the bout", "Eric dans une étreinte après le combat"],
    "Porträt von Eric im Schweizer Gi": ["Portrait of Eric in the Swiss gi", "Portrait d’Eric dans le kimono suisse"],
    "Eric dehnt sich beim Aufwärmen, hinter ihm das Team": ["Eric stretching during the warm-up, the team behind him", "Eric s’étire à l’échauffement, l’équipe derrière lui"],
    "Sponsoring-Spezial": ["Sponsoring special", "Spécial sponsoring"],
    "Dein Logo reist mit mir.": ["Your logo travels with me.", "Ton logo voyage avec moi."],
    "Für Unternehmen: Dein Logo kommt auf drei Ausrüstungsstücke, die ich bei jedem Turnier dabeihabe, auf der Matte und unterwegs.": ["For companies: your logo goes on three pieces of equipment I take to every tournament, on the mat and on the road.", "Pour les entreprises : ton logo figure sur trois pièces d’équipement que j’emporte à chaque tournoi, sur le tatami et en déplacement."],
    "Eric im Gi, am Ärmel das Logo von Physio Henrich": ["Eric in his gi, the Physio Henrich logo on the sleeve", "Eric en kimono, le logo de Physio Henrich sur la manche"],
    "Beispiel: Ärmel-Logo von Physio Henrich": ["Example: sleeve logo by Physio Henrich", "Exemple : logo de Physio Henrich sur la manche"],
    "Auf dem Gi": ["On the gi", "Sur le kimono"],
    "Dein Logo am Wettkampf-Gi. Zu sehen bei jedem Kampf, auf jedem Foto und in jedem Video.": ["Your logo on my competition gi. Visible in every bout, every photo and every video.", "Ton logo sur mon kimono de compétition. Visible à chaque combat, sur chaque photo et dans chaque vidéo."],
    "Skizze einer Sporttasche mit Platz für dein Logo": ["Sketch of a sports bag with room for your logo", "Croquis d’un sac de sport avec de la place pour ton logo"],
    "Dein Logo": ["Your logo", "Ton logo"],
    "Auf der Nationalkader-Tasche": ["On the national team bag", "Sur le sac de l’équipe nationale"],
    "Dein Logo auf meiner Tasche des Schweizer Nationalkaders. Sie ist an jedem Flughafen, in jeder Halle und auf jeder Reise dabei.": ["Your logo on my Swiss national team bag. It comes along to every airport, every arena and every trip.", "Ton logo sur mon sac de l’équipe nationale suisse. Il m’accompagne dans chaque aéroport, chaque salle et chaque voyage."],
    "Skizze eines Rucksacks mit Platz für dein Logo": ["Sketch of a backpack with room for your logo", "Croquis d’un sac à dos avec de la place pour ton logo"],
    "Auf dem Rucksack": ["On the backpack", "Sur le sac à dos"],
    "Dein Logo auf meinem Rucksack. Im Training, im Alltag und unterwegs.": ["Your logo on my backpack. In training, in everyday life and on the road.", "Ton logo sur mon sac à dos. À l’entraînement, au quotidien et en déplacement."],
    "Die Details und Konditionen besprechen wir persönlich.": ["We will discuss the details and terms personally.", "Nous discuterons personnellement des détails et des conditions."],
    "Anfrage senden": ["Send an enquiry", "Envoyer une demande"],
    "Quali Paris 2025": ["Qualifier Paris 2025", "Qualif. Paris 2025"],
    "WM-Qualifikationsturnier, Paris, Oktober 2025 · knapp verpasst": ["World Championships qualification tournament, Paris, October 2025 · narrowly missed", "Tournoi de qualification mondiale, Paris, octobre 2025 · manqué de peu"],
    "Fotos:": ["Photos:", "Photos :"],
    "u. a.": ["and others", "et autres"],
    "Eric schreit seinen Kampfgeist heraus, hinter ihm der Schriftzug «Karaté»": ["Eric lets out a battle cry, the word “Karaté” behind him", "Eric pousse un cri de combat, le mot « Karaté » derrière lui"],
    "Eric schreit voller Energie auf der Matte, die roten Handschuhe in den Händen": ["Eric shouts full of energy on the mat, red gloves in his hands", "Eric crie, plein d’énergie, sur le tatami, les gants rouges dans les mains"],
    "Eric im Angriff mit einem Fauststoss gegen seinen Gegner": ["Eric attacking his opponent with a punch", "Eric attaque son adversaire d’un coup de poing"],
    "Schlagabtausch mit einem Gegner aus Rumänien": ["Exchange of blows with an opponent from Romania", "Échange de coups avec un adversaire roumain"],
    "Eric steht konzentriert auf der Matte, hinter ihm die Anzeige «1 Point»": ["Eric standing focused on the mat, the “1 Point” display behind him", "Eric debout, concentré, sur le tatami, l’affichage « 1 Point » derrière lui"],
    "Eric von hinten, auf dem Rücken das WM-Schild «SUI»": ["Eric from behind, the World Championships “SUI” bib on his back", "Eric de dos, le dossard « SUI » des championnats du monde dans le dos"],
    "Eric hält den Handschuh an die Brust, Schwarz-Weiss-Aufnahme": ["Eric holding his glove to his chest, black-and-white shot", "Eric tient son gant contre sa poitrine, photo en noir et blanc"],
    "Eric geht mit gesenktem Blick über die Matte, Schwarz-Weiss-Aufnahme": ["Eric walking across the mat with lowered eyes, black-and-white shot", "Eric traverse le tatami, le regard baissé, photo en noir et blanc"],
    "Eric blickt vor dem Kampf nach oben, Schwarz-Weiss-Aufnahme": ["Eric looking up before the bout, black-and-white shot", "Eric lève les yeux avant le combat, photo en noir et blanc"],
    "Eric und sein Coach sitzen nebeneinander, Eric mit geschlossenen Augen und Kopfhörern": ["Eric and his coach sitting side by side, Eric with closed eyes and earbuds", "Eric et son coach assis côte à côte, Eric les yeux fermés, écouteurs dans les oreilles"],
    "Der Coach nimmt Eric nach dem Kampf in den Arm": ["The coach puts his arms around Eric after the bout", "Le coach prend Eric dans ses bras après le combat"],
    "Eric und sein Coach zeigen auf die Kamera, der Coach zwinkert": ["Eric and his coach point at the camera, the coach winks", "Eric et son coach pointent vers l’objectif, le coach fait un clin d’œil"],
    "Eric hält den Handschuh in die Kamera, sein Coach zeigt mit dem Finger auf den Betrachter": ["Eric holds his glove up to the camera, his coach points a finger at the viewer", "Eric tend son gant vers l’objectif, son coach pointe le doigt vers le spectateur"],
    "Eric und sein Coach zeigen vor der WM-Wand auf das Schweizer Dress": ["Eric and his coach pointing at the Swiss team jacket in front of the World Championships wall", "Eric et son coach montrent la veste suisse devant le mur des championnats du monde"],
    "Eric und sein Coach posieren mit geballten Fäusten vor der WM-Wand": ["Eric and his coach posing with clenched fists in front of the World Championships wall", "Eric et son coach posent poings serrés devant le mur des championnats du monde"],
    "Eric mit einem Teamkollegen vor dem Plakat des Qualifikationsturniers Paris 2025": ["Eric with a teammate in front of the Paris 2025 qualification tournament poster", "Eric avec un coéquipier devant l’affiche du tournoi de qualification Paris 2025"],
    "Eric mit einem Teamkollegen in der Aufwärmhalle, beide mit geballten Fäusten": ["Eric with a teammate in the warm-up hall, both with clenched fists", "Eric avec un coéquipier dans la salle d’échauffement, tous deux poings serrés"],
    "Eric übt in der Aufwärmhalle einen Fusstritt mit einem Trainingspartner": ["Eric practising a kick with a training partner in the warm-up hall", "Eric s’entraîne à un coup de pied avec un partenaire dans la salle d’échauffement"],
    "Eric trainiert in der Aufwärmhalle mit seinem Coach": ["Eric training with his coach in the warm-up hall", "Eric s’entraîne avec son coach dans la salle d’échauffement"],
    "Eric hebt in der Aufwärmhalle den Arm, auf dem Trikot sein Name und die Nummer 6": ["Eric raising his arm in the warm-up hall, his name and the number 6 on his jersey", "Eric lève le bras dans la salle d’échauffement, son nom et le numéro 6 sur le maillot"],
    "Wappen der Gemeinde Sisseln": ["Coat of arms of the municipality of Sisseln", "Armoiries de la commune de Sisseln"],
    "Gemeinde": ["Municipality", "Commune"],
    "Für Unternehmen: Dein Logo kommt auf Ausrüstung, die ich bei jedem Turnier dabeihabe, auf der Matte und unterwegs.": ["For companies: your logo goes on equipment I take to every tournament, on the mat and on the road.", "Pour les entreprises : ton logo apparaît sur l’équipement que j’emmène à chaque tournoi, sur le tatami et en déplacement."],
    "<b>Ab CHF 1000</b> kommt dein Logo auf das Gi, den Rucksack oder die Nationalkader-Tasche. Die Details besprechen wir persönlich.": ["<b>From CHF 1000</b>, your logo goes on the gi, the backpack or the national team bag. We will discuss the details personally.", "<b>Dès 1000 CHF</b>, ton logo apparaît sur le gi, le sac à dos ou le sac de l’équipe nationale. Nous discuterons des détails personnellement."],
    "Diese Partner stehen hinter mir.": ["These partners stand behind me.", "Ces partenaires sont derrière moi."],
    "Und danke an alle, die mich privat unterstützen.": ["And thank you to everyone who supports me personally.", "Et merci à tous ceux qui me soutiennent à titre personnel."],
    "Gemeinde Sisseln": ["Municipality of Sisseln", "Commune de Sisseln"],
    "Kalender": ["Calendar", "Calendrier"],
    "Turnierkalender": ["Tournament calendar", "Calendrier des tournois"],
    "Weltkarte der Turniere": ["World map of tournaments", "Carte du monde des tournois"],
    "Die nächsten Turniere.": ["The next tournaments.", "Les prochains tournois."],
    "Ganzer Kalender": ["Full calendar", "Calendrier complet"],
    "Hier kämpfe ich: Series A, Swiss Karate League und Schweizermeisterschaft.": ["Where I compete: Series A, Swiss Karate League and the Swiss Championships.", "Là où je combats : Series A, Swiss Karate League et championnats de Suisse."],
    "Alle": ["All", "Tous"],
    "Europameisterschaft": ["European Championships", "Championnats d’Europe"],
    "Weltmeisterschaft": ["World Championships", "Championnats du monde"],
    "WM-Quali": ["Worlds qualifier", "Qualif. mondiale"],
    "Swiss League": ["Swiss League", "Swiss League"],
    "Weitere Turniere": ["Other tournaments", "Autres tournois"],
    "Schweizermeisterschaft": ["Swiss Championships", "Championnats de Suisse"],
    "Quelle: <a href=\"https://www.wkf.net/calendar\" target=\"_blank\" rel=\"noopener\">WKF-Kalender</a>, wird täglich abgeglichen. Änderungen vorbehalten.": ["Source: <a href=\"https://www.wkf.net/calendar\" target=\"_blank\" rel=\"noopener\">WKF calendar</a>, checked daily. Subject to change.", "Source : <a href=\"https://www.wkf.net/calendar\" target=\"_blank\" rel=\"noopener\">calendrier WKF</a>, mis à jour chaque jour. Sous réserve de modifications."],
    "Quelle: <a href=\"https://www.wkf.net/calendar\" target=\"_blank\" rel=\"noopener\">WKF-Kalender</a> (täglich abgeglichen) und <a href=\"https://www.karate.ch/service/agenda/\" target=\"_blank\" rel=\"noopener\">SKF-Agenda</a>. Änderungen vorbehalten.": ["Source: <a href=\"https://www.wkf.net/calendar\" target=\"_blank\" rel=\"noopener\">WKF calendar</a> (checked daily) and <a href=\"https://www.karate.ch/service/agenda/\" target=\"_blank\" rel=\"noopener\">SKF agenda</a>. Subject to change.", "Source : <a href=\"https://www.wkf.net/calendar\" target=\"_blank\" rel=\"noopener\">calendrier WKF</a> (mis à jour chaque jour) et <a href=\"https://www.karate.ch/service/agenda/\" target=\"_blank\" rel=\"noopener\">agenda SKF</a>. Sous réserve de modifications."],
    "Turnierart": ["Tournament type", "Type de tournoi"],
    "Persönliche Dankesnachricht per WhatsApp oder E-Mail": ["Personal thank-you message via WhatsApp or email", "Message de remerciement personnel par WhatsApp ou e-mail"],
    "Einladung zu einem Training mit mir": ["Invitation to a training session with me", "Invitation à un entraînement avec moi"],
    "Einladung zu einem privaten Essen mit mir": ["Invitation to a private dinner with me", "Invitation à un dîner privé avec moi"],
    "1–2 Updates pro Jahr mit Resultaten und Foto": ["1–2 updates a year with results and a photo", "1–2 nouvelles par an avec résultats et photo"],
    "Wofür das Geld": ["What the money is for", "À quoi sert l’argent"],
    "Das passiert mit deinem Beitrag.": ["This is what your contribution does.", "Voilà ce que ta contribution permet."],
    "Als Spitzensportler neben der KV-Lehre trage ich viele Kosten selbst: Startgebühren, Reisen, Hotels und Ausrüstung. Dein Beitrag geht direkt dahin. Ein paar Beispiele:": ["As a top athlete alongside my commercial apprenticeship, I cover many costs myself: entry fees, travel, hotels and equipment. Your contribution goes straight there. A few examples:", "En tant que sportif d’élite en parallèle de mon apprentissage commercial, je prends en charge beaucoup de frais moi-même : frais d’inscription, voyages, hôtels et équipement. Ta contribution va directement là. Quelques exemples :"],
    "Ein Teil der Anmeldung und der Reise zu einem Turnier.": ["Part of the entry and travel for a tournament.", "Une partie de l’inscription et du voyage pour un tournoi."],
    "Die Startgebühr für ein internationales Turnier.": ["The entry fee for an international tournament.", "Les frais d’inscription pour un tournoi international."],
    "Ein Flug zu einem Turnier in Europa.": ["A flight to a tournament in Europe.", "Un vol pour un tournoi en Europe."],
    "Hotel und Reise für ein ganzes Turnierwochenende.": ["Hotel and travel for a whole tournament weekend.", "Hôtel et voyage pour tout un week-end de tournoi."],
    "Ein ganzes Turnier: Startgebühr, Reise und Hotel.": ["A whole tournament: entry fee, travel and hotel.", "Un tournoi complet : inscription, voyage et hôtel."],
    "Richtwerte. Die tatsächlichen Kosten hängen vom Turnier und vom Reiseziel ab.": ["Rough guide values. Actual costs depend on the tournament and the destination.", "Valeurs indicatives. Les coûts réels dépendent du tournoi et de la destination."],
    "WM Budapest 2023": ["World Champs Budapest 2023", "Mondial Budapest 2023"],
    "26. Senioren-Weltmeisterschaft, Budapest, Oktober 2023 · Elite-Debüt": ["26th Senior World Championships, Budapest, October 2023 · senior debut", "26<sup>e</sup> Championnats du monde seniors, Budapest, octobre 2023 · débuts chez les seniors"],
    "Swiss Karate Federation, Archiv Eric Timmer": ["Swiss Karate Federation, Eric Timmer’s archive", "Swiss Karate Federation, archives d’Eric Timmer"],
    "Eric im Schweizer Gi steht dem Gegner aus Slowenien gegenüber, im Hintergrund das WKF-Banner": ["Eric in the Swiss gi facing his Slovenian opponent, the WKF banner behind them", "Eric en kimono suisse face à son adversaire slovène, la bannière WKF en arrière-plan"],
    "Eric geht in den Angriff über, sein Gegner hebt das Bein, der Kampfrichter im Hintergrund": ["Eric moves in to attack as his opponent lifts a leg, the referee behind them", "Eric passe à l’attaque pendant que son adversaire lève la jambe, l’arbitre en arrière-plan"],
    "Eric läuft konzentriert beim Einmarsch der Athleten durch die Halle": ["Eric walking through the arena, focused, during the athletes’ entrance", "Eric traverse la salle, concentré, lors de l’entrée des athlètes"],
    "Eric wartet auf der Matte, vor ihm der Gegner von hinten in der riesigen Budapester Halle": ["Eric waiting on the mat, his opponent seen from behind in the huge Budapest arena", "Eric attend sur le tatami, son adversaire de dos dans l’immense salle de Budapest"],
    "Eric sitzt konzentriert neben dem Coach in der roten Schweizer Jacke": ["Eric sitting focused next to his coach in the red Swiss jacket", "Eric assis, concentré, à côté de son coach en veste suisse rouge"],
    "Eric setzt einen hohen Fusstritt gegen seinen Gegner an": ["Eric launches a high kick at his opponent", "Eric place un coup de pied haut sur son adversaire"],
    "Eric und ein Teamkollege vor der Wand der 26. Senioren-Weltmeisterschaft in Budapest": ["Eric and a teammate in front of the wall of the 26th Senior World Championships in Budapest", "Eric et un coéquipier devant le mur des 26<sup>e</sup> Championnats du monde seniors à Budapest"],
    "U21-EM Zypern 2023": ["U21 Euros Cyprus 2023", "Euro U21 Chypre 2023"],
    "U21-Europameisterschaft, Zypern, 2023": ["U21 European Championships, Cyprus, 2023", "Championnats d’Europe U21, Chypre, 2023"],
    "Swiss Karate Federation": ["Swiss Karate Federation", "Swiss Karate Federation"],
    "Eric steht konzentriert mit EKF-Akkreditierung am Hals, im Hintergrund die Banner des Turniers in Zypern": ["Eric standing focused with his EKF accreditation around his neck, tournament banners from Cyprus behind him", "Eric debout, concentré, l’accréditation EKF autour du cou, les bannières du tournoi à Chypre en arrière-plan"],
    "Eric in Kampfstellung gegenüber seinem Gegner aus Polen": ["Eric in fighting stance facing his Polish opponent", "Eric en garde face à son adversaire polonais"],
    "Eric schreit seinen Kampfgeist heraus, sein Gegner liegt am Boden": ["Eric shouting out his fighting spirit while his opponent lies on the floor", "Eric crie son esprit de combat pendant que son adversaire est au sol"],
    "Eric geht konzentriert auf die Matte, im Hintergrund weitere Athleten": ["Eric walking onto the mat, focused, other athletes behind him", "Eric entre concentré sur le tatami, d’autres athlètes en arrière-plan"],
    "Eric setzt einen Fusstritt gegen seinen Gegner an": ["Eric launches a kick at his opponent", "Eric place un coup de pied sur son adversaire"],
    "U21-EM Tbilisi 2024": ["U21 Euros Tbilisi 2024", "Euro U21 Tbilissi 2024"],
    "U21-Europameisterschaft, Tbilisi, Februar 2024 · Kumite −60 kg": ["U21 European Championships, Tbilisi, February 2024 · Kumite −60 kg", "Championnats d’Europe U21, Tbilissi, février 2024 · Kumite −60 kg"],
    "Eric steht konzentriert mit roten Handschuhen auf der Matte, die Zunge zwischen den Lippen": ["Eric standing focused on the mat in red gloves, tongue between his lips", "Eric debout, concentré, avec des gants rouges sur le tatami, la langue entre les lèvres"],
    "Eric dreht sich mit offenem Mund um und schreit, hinter ihm die Anzeigetafel mit Schweiz gegen Norwegen": ["Eric turning around shouting, the scoreboard behind him showing Switzerland against Norway", "Eric se retourne en criant, derrière lui le tableau d’affichage Suisse contre Norvège"],
    "Eric setzt im tiefen Ausfallschritt einen Fauststoss gegen seinen Gegner": ["Eric lands a punch from a deep lunge against his opponent", "Eric place un coup de poing en fente basse sur son adversaire"],
    "Eric im Nahkampf mit seinem norwegischen Gegner vor der Bande von Gross Energy Group": ["Eric in close combat with his Norwegian opponent in front of the Gross Energy Group boards", "Eric au corps à corps avec son adversaire norvégien devant les panneaux Gross Energy Group"],
    "Eric in tiefer Position im Kumite, auf der Anzeige 1:16 Minuten": ["Eric in a low stance in kumite, the clock showing 1:16", "Eric en position basse en kumite, le chrono affiche 1:16"],
    "Eric holt mit einem hohen Fusstritt gegen seinen Gegner aus": ["Eric swings a high kick at his opponent", "Eric balance un coup de pied haut sur son adversaire"],
    "Eric sitzt mit Mundschutz neben seinem Coach in der roten Schweizer Jacke": ["Eric sitting with his mouthguard in next to his coach in the red Swiss jacket", "Eric assis avec son protège-dents à côté de son coach en veste suisse rouge"],
    "Eric blickt konzentriert zur Seite, im Hintergrund das Banner der Meisterschaft in Tbilisi": ["Eric looking to the side, focused, the championship banner from Tbilisi behind him", "Eric regarde sur le côté, concentré, la bannière du championnat de Tbilissi en arrière-plan"],
    "Eric dreht sich im Fusstritt zur Seite, im Hintergrund das WKF-Europa-Logo": ["Eric turning sideways into a kick, the European WKF logo in the background", "Eric pivote dans un coup de pied, le logo WKF Europe en arrière-plan"],
    "Eric mit angehobenem Knie im Angriff, im Hintergrund die Schweizer Fahne auf der Tribüne": ["Eric attacking with his knee raised, a Swiss flag in the stands behind him", "Eric à l’attaque, le genou levé, un drapeau suisse dans les tribunes derrière lui"],
    "Fahr mit der Maus auf ein Jahr oder tippe darauf. Die Zeit läuft von rechts nach links zurück.": ["Hover over a year or tap it. Time runs back from right to left.", "Passe la souris sur une année ou touche-la. Le temps remonte de droite à gauche."],
    "Älter": ["Earlier", "Plus ancien"],
    "Neuer": ["Later", "Plus récent"],
    "Jahr wählen": ["Choose a year", "Choisir une année"],
    "Basel Open Masters 2022": ["Basel Open Masters 2022", "Basel Open Masters 2022"],
    "Basel Open Masters 2026": ["Basel Open Masters 2026", "Basel Open Masters 2026"],
    "Basel Open Masters, 2022": ["Basel Open Masters, 2022", "Basel Open Masters, 2022"],
    "Eric im hohen Fusstritt, sein Gegner mit blauem Gürtel weicht aus": ["Eric in a high kick while his blue-belt opponent dodges", "Eric dans un coup de pied haut pendant que son adversaire à ceinture bleue esquive"],
    "Fusstritt zum Kopf, im Hintergrund die Länderflaggen der Halle": ["A kick to the head, the national flags of the hall in the background", "Un coup de pied à la tête, les drapeaux nationaux de la salle en arrière-plan"],
    "Eric liegt nach einem Wurf am Boden, sein Gegner beugt sich über ihn": ["Eric on the floor after a throw, his opponent leaning over him", "Eric au sol après une projection, son adversaire penché sur lui"],
    "Eric setzt im Ausfallschritt einen Fauststoss gegen seinen Gegner": ["Eric lands a punch from a lunge against his opponent", "Eric place un coup de poing en fente sur son adversaire"],
    "Schlagabtausch: Eric weicht dem Angriff seines Gegners nach hinten aus": ["An exchange: Eric leans back out of his opponent’s attack", "Échange : Eric se penche en arrière pour esquiver l’attaque de son adversaire"],
    "Eric im Fusstritt, sein Gegner kontert mit hohem Bein": ["Eric kicking while his opponent counters with a high leg", "Eric dans un coup de pied, son adversaire contre avec une jambe haute"],
    "Eric schreit nach dem Punkt, in der weiten Halle mit den Länderflaggen": ["Eric shouting after scoring, in the wide hall with the national flags", "Eric crie après le point, dans la grande salle avec les drapeaux nationaux"],
    "EM Zadar 2024": ["Euros Zadar 2024", "Euro Zadar 2024"],
    "59. Europameisterschaft, Zadar, Kroatien, 2024 · 9. Platz": ["59th European Championships, Zadar, Croatia, 2024 · 9th place", "59<sup>e</sup> Championnats d’Europe, Zadar, Croatie, 2024 · 9<sup>e</sup> place"],
    "Eric blickt konzentriert nach unten, hinter ihm die blaue Sponsorenwand": ["Eric looking down, focused, the blue sponsor wall behind him", "Eric regarde vers le bas, concentré, le mur bleu des sponsors derrière lui"],
    "Eric schreit nach dem Punkt, die roten Handschuhe vor dem Körper": ["Eric shouting after a point, red gloves in front of his body", "Eric crie après le point, les gants rouges devant le corps"],
    "Eric trifft seinen türkischen Gegner mit einem Fauststoss, im Hintergrund das Banner der 59. Europameisterschaft": ["Eric lands a punch on his Turkish opponent, the banner of the 59th European Championships behind them", "Eric touche son adversaire turc d’un coup de poing, la bannière des 59<sup>e</sup> Championnats d’Europe en arrière-plan"],
    "Eric und sein Coach von hinten, beide blicken in die Halle von Zadar": ["Eric and his coach from behind, both looking out over the arena in Zadar", "Eric et son coach de dos, regardant tous deux la salle de Zadar"],
    "Das Schweizer Team vor der Halle in Zadar": ["The Swiss team in front of the arena in Zadar", "L’équipe suisse devant la salle de Zadar"],
    "Eric in Kampfstellung gegenüber seinem Gegner, hinter ihnen das Banner der Senioren-Europameisterschaft": ["Eric in fighting stance facing his opponent, the senior European Championships banner behind them", "Eric en garde face à son adversaire, la bannière des Championnats d’Europe seniors derrière eux"],
    "Eric hält das SUI-Schild der 59. Europameisterschaft Zadar 2024": ["Eric holding the SUI sign of the 59th European Championships Zadar 2024", "Eric tient le panneau SUI des 59<sup>e</sup> Championnats d’Europe Zadar 2024"],
    "EM Yerevan 2025": ["Euros Yerevan 2025", "Euro Erevan 2025"],
    "60. Europameisterschaft, Yerevan, Armenien, Mai 2025": ["60th European Championships, Yerevan, Armenia, May 2025", "60<sup>e</sup> Championnats d’Europe, Erevan, Arménie, mai 2025"],
    "Eric im Kampfanzug mit rotem Gürtel und Schweizer Wappen, ruhig vor dem Kampf": ["Eric in his competition gi with the red belt and Swiss crest, calm before the fight", "Eric en kimono de compétition avec la ceinture rouge et l’écusson suisse, calme avant le combat"],
    "Eric grüsst vor seinem Kampf, auf der Anzeigetafel steht Frankreich": ["Eric bows before his fight, France on the scoreboard", "Eric salue avant son combat, la France s’affiche au tableau"],
    "Eric im Kampf an der EM in Yerevan, im Hintergrund die Ränge der Halle": ["Eric in a bout at the Europeans in Yerevan, the stands of the arena behind him", "Eric en plein combat aux Championnats d’Europe à Erevan, les gradins de la salle en arrière-plan"],
    "Eric, eine Teamkollegin und ein Teamkollege hinter dem Schweiz-Schild der 60. Europameisterschaft": ["Eric with a female and a male teammate behind the Switzerland sign of the 60th European Championships", "Eric avec une coéquipière et un coéquipier derrière le panneau Suisse des 60<sup>e</sup> Championnats d’Europe"],
    "Eric und ein Teamkollege vor dem Banner der Europameisterschaft Yerevan 2025": ["Eric and a teammate in front of the banner of the European Championships Yerevan 2025", "Eric et un coéquipier devant la bannière des Championnats d’Europe Erevan 2025"],
    "Eric und ein Teamkollege in den roten Jacken der Swiss Karate Federation vor dem Netz der Halle": ["Eric and a teammate in the red Swiss Karate Federation jackets in front of the arena net", "Eric et un coéquipier dans les vestes rouges de la Swiss Karate Federation devant le filet de la salle"],
    "Das Schweizer Team im Fotorahmen der Europameisterschaft Yerevan 2025": ["The Swiss team in the photo frame of the European Championships Yerevan 2025", "L’équipe suisse dans le cadre photo des Championnats d’Europe Erevan 2025"],
    "Das Schweizer Team posiert mit dem Maskottchen der Europameisterschaft": ["The Swiss team posing with the mascot of the European Championships", "L’équipe suisse pose avec la mascotte des Championnats d’Europe"],
    "Selfie von Eric mit dem Maskottchen im Hotel": ["Eric taking a selfie with the mascot in the hotel", "Selfie d’Eric avec la mascotte à l’hôtel"],
    "Das Maskottchen im Karate-Anzug mit schwarzem Gürtel streckt beide Daumen hoch": ["The mascot in a karate gi with a black belt gives two thumbs up", "La mascotte en kimono de karaté avec ceinture noire lève les deux pouces"],
    "Selfie von Eric mit zwei Teamkollegen in der Halle, aufgenommen am 6. Mai 2025": ["Selfie of Eric with two teammates in the arena, taken on 6 May 2025", "Selfie d’Eric avec deux coéquipiers dans la salle, pris le 6 mai 2025"],
    "Eric läuft sich lächelnd in der Trainingshalle ein": ["Eric smiling as he warms up in the training hall", "Eric s’échauffe en souriant dans la salle d’entraînement"],
    "Eric übt im Training mit seinem Coach einen Fauststoss": ["Eric practising a punch with his coach in training", "Eric travaille un coup de poing avec son coach à l’entraînement"],
    "Eric hört im Training aufmerksam auf die Anweisungen seines Coachs": ["Eric listening closely to his coach’s instructions in training", "Eric écoute attentivement les consignes de son coach à l’entraînement"],
    "Eric im Training gegen eine Teamkollegin, die einen hohen Tritt ausführt": ["Eric in training against a teammate throwing a high kick", "Eric à l’entraînement face à une coéquipière qui place un coup de pied haut"],
    "Eric zeigt im Training einen hohen Tritt gegen einen Teamkollegen": ["Eric throwing a high kick against a teammate in training", "Eric place un coup de pied haut contre un coéquipier à l’entraînement"],
    "Eric und zwei Teamkolleginnen sitzen nach dem Training auf der Matte und lachen": ["Eric and two female teammates sitting on the mat laughing after training", "Eric et deux coéquipières assis sur le tapis en riant après l’entraînement"],
    "Eric umarmt im Training einen Sparringspartner": ["Eric hugging a sparring partner in training", "Eric serre un partenaire d’entraînement dans ses bras"],
    "Eric liegt mit geschlossenen Augen auf der blauen Matte": ["Eric lying on the blue mat with his eyes closed", "Eric allongé sur le tapis bleu, les yeux fermés"],
    "Eric springt mit erhobenem Knie gegen seinen brasilianischen Gegner": ["Eric jumping with his knee raised against his Brazilian opponent", "Eric saute, genou levé, face à son adversaire brésilien"],
    "Eric trifft seinen brasilianischen Gegner mit einem Fauststoss am Kopf": ["Eric lands a punch to the head of his Brazilian opponent", "Eric touche son adversaire brésilien à la tête d’un coup de poing"],
    "Eric und sein brasilianischer Gegner begrüssen sich zu Beginn des Kampfes": ["Eric and his Brazilian opponent greeting each other at the start of the bout", "Eric et son adversaire brésilien se saluent au début du combat"],
    "Eric weicht mit einer Drehung aus, sein Gegner schreit auf": ["Eric turns away from the attack while his opponent shouts", "Eric esquive en pivotant, son adversaire crie"],
    "Eric trifft im Ausfallschritt mit der Faust, im Hintergrund der Kampfrichtertisch": ["Eric lunging with a punch, the judges’ table in the background", "Eric frappe du poing en fente, la table des juges en arrière-plan"],
    "Eric schreit nach dem Punkt, die blauen Handschuhe vor dem Körper": ["Eric shouting after scoring, blue gloves in front of his body", "Eric crie après le point, les gants bleus devant le corps"],
    "Eric trifft seinen französischen Gegner im Halbfinal mit einem hohen Tritt": ["Eric hits his French opponent with a high kick in the semi-final", "Eric touche son adversaire français d’un coup de pied haut en demi-finale"],
    "Eric blickt nach oben, die Hand auf dem Schweizer Wappen": ["Eric looks up, hand on the Swiss crest", "Eric lève les yeux, la main sur l’écusson suisse"],
    "Eric im Kampf um Bronze gegen seinen österreichischen Gegner": ["Eric in the bronze-medal bout against his Austrian opponent", "Eric dans le combat pour le bronze face à son adversaire autrichien"],
    "Eric blickt mit den Handschuhen in den Händen zur Anzeigetafel": ["Eric looks up at the scoreboard, gloves in hand", "Eric regarde le tableau d’affichage, les gants en main"],
    "Eric lächelt seinem Coach zu": ["Eric smiling at his coach", "Eric sourit à son coach"],
    "Eric verfolgt konzentriert einen Kampf vom Rand der Matte aus": ["Eric watching a bout intently from the edge of the mat", "Eric suit un combat avec concentration depuis le bord du tatami"],
    "Basel Open Masters 2025": ["Basel Open Masters 2025", "Basel Open Masters 2025"],
    "Basel Open Masters, 2025 · Kumite −60 kg": ["Basel Open Masters, 2025 · Kumite −60 kg", "Basel Open Masters, 2025 · Kumité −60 kg"],
    "Eric in Kata-Grundstellung mit braunem Gürtel, dahinter ein weiterer Teilnehmer": ["Eric in the kata ready stance with a brown belt, another competitor behind him", "Eric en position de départ de kata, ceinture marron, un autre participant derrière lui"],
    "Das Schweizer Team mit Medaillen und Urkunden nach dem World Cup in Dublin": ["The Swiss team with medals and certificates after the World Cup in Dublin", "L’équipe suisse avec médailles et diplômes après la World Cup à Dublin"],
    "Das Schweizer Team in der Halle in Dublin, vorne die Jüngeren kniend, hinten die Älteren stehend": ["The Swiss team in the hall in Dublin, the younger members kneeling in front, the older ones standing behind", "L’équipe suisse dans la salle à Dublin, les plus jeunes à genoux devant, les plus âgés debout derrière"],
    "Das Schweizer Team vor den WSKF-Bannern, in der Mitte sitzt ein Betreuer im grünen Anzug": ["The Swiss team in front of the WSKF banners, a coach in a green gi sitting in the middle", "L’équipe suisse devant les bannières WSKF, un entraîneur en kimono vert assis au centre"],
    "Ein Betreuer richtet Eric vor dem Start die Teamjacke": ["A team official adjusts Eric’s team jacket before the start", "Un encadrant ajuste la veste d’équipe d’Eric avant le départ"],
    "WSKF World Cup 2018": ["WSKF World Cup 2018", "WSKF World Cup 2018"],
    "WSKF World Cup, Dublin, Irland, Oktober 2018 · 3-facher Weltcup-Sieger": ["WSKF World Cup, Dublin, Ireland, October 2018 · 3-time World Cup winner", "WSKF World Cup, Dublin, Irlande, octobre 2018 · triple vainqueur de la World Cup"],
    "Dreifacher Weltcup-Sieger am WSKF World Cup in Dublin": ["Three-time World Cup winner at the WSKF World Cup in Dublin", "Triple vainqueur de la WSKF World Cup à Dublin"],
    "Eric in der roten Swiss-Karate-Jacke vor der Sponsorenwand der Moscow Karate Universe 2024": ["Eric in the red Swiss Karate Federation jacket in front of the sponsor wall of Moscow Karate Universe 2024", "Eric dans la veste rouge de la Swiss Karate Federation devant le mur des sponsors de la Moscow Karate Universe 2024"],
    "Eric und sein Coach legen sich vor der Sponsorenwand den Arm um die Schulter": ["Eric and his coach with their arms around each other in front of the sponsor wall", "Eric et son coach, le bras sur l’épaule, devant le mur des sponsors"],
    "Eric und sein Coach sitzen nebeneinander in der Halle, im Hintergrund die Lichtshow": ["Eric and his coach sitting side by side in the arena, the light show behind them", "Eric et son coach assis côte à côte dans la salle, le show lumineux en arrière-plan"],
    "Eric im blauen Shirt der Sport Academy Zurich vor der Sponsorenwand": ["Eric in the blue Sport Academy Zurich shirt in front of the sponsor wall", "Eric en t-shirt bleu de la Sport Academy Zurich devant le mur des sponsors"],
    "Eric im Kampfanzug mit blauen Schützern in der Aufwärmhalle, rund um ihn andere Kämpfer": ["Eric in his gi with blue protectors in the warm-up hall, other fighters around him", "Eric en kimono avec les protections bleues dans la salle d’échauffement, entouré d’autres combattants"],
    "Selfie von Eric und seinem Coach am Flughafen in Istanbul auf dem Weg nach Moskau": ["Selfie of Eric and his coach at Istanbul airport on the way to Moscow", "Selfie d’Eric et de son coach à l’aéroport d’Istanbul en route pour Moscou"],
    "Moscow Karate Universe 2024": ["Moscow Karate Universe 2024", "Moscow Karate Universe 2024"],
    "Moscow Karate Universe, Moskau, Russland, November 2024": ["Moscow Karate Universe, Moscow, Russia, November 2024", "Moscow Karate Universe, Moscou, Russie, novembre 2024"],
    "Moscow Karate Universe in Moskau, Russland": ["Moscow Karate Universe in Moscow, Russia", "Moscow Karate Universe à Moscou, Russie"],
    "Alle Stationen von den ersten Trainings bis heute, Jahr für Jahr.": ["Every milestone from the first training sessions to today, year by year.", "Toutes les étapes, des premiers entraînements à aujourd’hui, année après année."],
    "Zur Karriere": ["See my career", "Voir ma carrière"],
    "Resultate und Rangliste ansehen": ["View results and ranking", "Voir les résultats et le classement"],
    "Eric im Kumite beim Karate 1 Series A in Jakarta 2022 mit einem hohen Fusstritt gegen seinen Gegner": ["Eric in kumite at Karate 1 Series A in Jakarta 2022 with a high kick against his opponent", "Eric en kumite à la Karate 1 Series A de Jakarta 2022 avec un coup de pied haut contre son adversaire"],
    "Eric im Duell mit einem indischen Gegner, auf der Anzeigetafel SUI gegen IND": ["Eric in a bout against an Indian opponent, SUI versus IND on the scoreboard", "Eric en duel contre un adversaire indien, SUI contre IND au tableau d’affichage"],
    "Eric im Duell mit seinem Gegner aus Hongkong, der einen Fusstritt ansetzt": ["Eric in a bout with his opponent from Hong Kong, who throws a kick", "Eric en duel contre son adversaire de Hong Kong, qui lance un coup de pied"],
    "Eric hört seinem Coach vor dem Kampf aufmerksam zu": ["Eric listens closely to his coach before the bout", "Eric écoute attentivement son coach avant le combat"],
    "Eric und sein Coach sitzen am Mattenrand und verfolgen den Kampf": ["Eric and his coach sit at the edge of the mat watching the bout", "Eric et son coach sont assis au bord du tatami et suivent le combat"],
    "Eric senkt den Kopf und sammelt sich im Gegenlicht": ["Eric lowers his head and composes himself in the backlight", "Eric baisse la tête et se concentre à contre-jour"],
    "Eric blickt konzentriert zur Seite, im Hintergrund die Hallenlampen": ["Eric looks aside with focus, the arena lights behind him", "Eric regarde de côté, concentré, les lampes de la salle derrière lui"],
    "Eric im Profil, ruhig und fokussiert vor dem Kampf": ["Eric in profile, calm and focused before the bout", "Eric de profil, calme et concentré avant le combat"],
    "Eric im Seitenprofil im Warm-up-Bereich": ["Eric in side profile in the warm-up area", "Eric de profil dans la zone d’échauffement"],
    "Eric schaut direkt in die Kamera, bereit für den nächsten Kampf": ["Eric looks straight into the camera, ready for his next bout", "Eric regarde droit vers l’objectif, prêt pour son prochain combat"],
    "Das Maskottchen, ein Tiger im Karate-Gi, in der Halle in Jakarta": ["The mascot, a tiger in a karate gi, in the arena in Jakarta", "La mascotte, un tigre en karaté-gi, dans la salle de Jakarta"],
    "Schweizermeisterschaft 2025": ["Swiss Championships 2025", "Championnats de Suisse 2025"],
    "Schweizermeisterschaften, Sursee, 2025 · Vize-Schweizermeister": ["Swiss Championships, Sursee, 2025 · Swiss runner-up", "Championnats de Suisse, Sursee, 2025 · Vice-champion suisse"],
    "Eric ballt die Faust und ruft nach einem Punkt an der Schweizermeisterschaft in Sursee 2025": ["Eric clenches his fist and shouts after scoring at the Swiss Championships in Sursee 2025", "Eric serre le poing et crie après un point aux championnats de Suisse à Sursee 2025"],
    "Schlagabtausch an der Schweizermeisterschaft: Eric mit blauem Gürtel weicht dem Angriff seines Gegners aus": ["Exchange at the Swiss Championships: Eric, in the blue belt, evades his opponent’s attack", "Échange aux championnats de Suisse : Eric, ceinture bleue, esquive l’attaque de son adversaire"],
    "Eric schliesst die Augen, sein Coach hält sein Gesicht und spricht vor dem Kampf mit ihm": ["Eric closes his eyes while his coach holds his face and talks to him before the bout", "Eric ferme les yeux pendant que son coach lui tient le visage et lui parle avant le combat"],
    "Gruppenfoto des Teams mit den Trainern vor dem Sursee-2025-Banner": ["Team photo with the coaches in front of the Sursee 2025 banner", "Photo d’équipe avec les entraîneurs devant la bannière Sursee 2025"],
    "Series A Kuala Lumpur 2025": ["Series A Kuala Lumpur 2025", "Series A Kuala Lumpur 2025"],
    "Karate 1 Series A, Kuala Lumpur, Malaysia, Oktober 2025 · Mit Trainingslager": ["Karate 1 Series A, Kuala Lumpur, Malaysia, October 2025 · Incl. training camp", "Karate 1 Series A, Kuala Lumpur, Malaisie, octobre 2025 · Avec stage d’entraînement"],
    "Eric im Duell mit seinem Gegner vor der Kuala-Lumpur-2025-Wand beim Karate 1 Series A": ["Eric in a bout with his opponent in front of the Kuala Lumpur 2025 backdrop at the Karate 1 Series A", "Eric en combat contre son adversaire devant le fond Kuala Lumpur 2025 à la Karate 1 Series A"],
    "Eric in Kampfstellung vor der Sponsorenwand des Karate 1 Series A": ["Eric in fighting stance in front of the Karate 1 Series A sponsor wall", "Eric en garde devant le mur de sponsors de la Karate 1 Series A"],
    "Eric in Nahaufnahme neben seinem Gegner auf der Matte": ["Close-up of Eric next to his opponent on the mat", "Gros plan sur Eric à côté de son adversaire sur le tapis"],
    "Eric im Profil, ruhig und konzentriert vor dem Kampf, auf der Anzeigetafel SUI Timmer": ["Eric in profile, calm and focused before the bout, with SUI Timmer on the scoreboard", "Eric de profil, calme et concentré avant le combat, avec SUI Timmer sur le tableau d’affichage"],
    "Eric im Sparring-Training in Malaysia, hinter ihm wartet die Trainingsgruppe": ["Eric sparring in training in Malaysia, with the training group waiting behind him", "Eric en sparring à l’entraînement en Malaisie, le groupe attend derrière lui"],
    "Ein Trainer erklärt Eric im Trainingslager eine Übung, die Gruppe schaut zu": ["A coach explains an exercise to Eric at the training camp while the group watches", "Un coach explique un exercice à Eric au stage d’entraînement pendant que le groupe regarde"],
    "Series A Jakarta 2022": ["Series A Jakarta 2022", "Series A Jakarta 2022"],
    "Karate 1 Series A, Jakarta, Indonesien, 2022": ["Karate 1 Series A, Jakarta, Indonesia, 2022", "Karate 1 Series A, Jakarta, Indonésie, 2022"],
    "Siegerehrung an den Schweizermeisterschaften in Aarberg: vier Medaillengewinner auf dem Podest": ["Medal ceremony at the Swiss Championships in Aarberg: four medallists on the podium", "Remise des médailles aux Championnats de Suisse à Aarberg : quatre médaillés sur le podium"],
    "Schweizermeisterschaften, Aarberg, 2019 · Schweizermeister": ["Swiss Championships, Aarberg, 2019 · Swiss champion", "Championnats de Suisse, Aarberg, 2019 · Champion suisse"],
    "Schweizermeisterschaft 2019": ["Swiss Championships 2019", "Championnats de Suisse 2019"],
    "Schweizermeister": ["Swiss champion", "Champion suisse"],
    "Siegerehrung an den Schweizermeisterschaften in Sursee 2020: Podest mit den ersten drei Plätzen": ["Medal ceremony at the 2020 Swiss Championships in Sursee: podium with the top three", "Remise des médailles aux Championnats de Suisse 2020 à Sursee : podium des trois premiers"],
    "Schweizermeisterschaften, Sursee, 2020 · Schweizermeister": ["Swiss Championships, Sursee, 2020 · Swiss champion", "Championnats de Suisse, Sursee, 2020 · Champion suisse"],
    "Schweizermeisterschaft 2020": ["Swiss Championships 2020", "Championnats de Suisse 2020"],
    "Eric auf dem obersten Podestplatz mit dem Pokal, neben ihm der Zweitplatzierte mit der Silbermedaille, an den Schweizermeisterschaften in Sursee 2022": ["Eric on the top step of the podium holding the trophy, next to the runner-up with the silver medal, at the 2022 Swiss Championships in Sursee", "Eric sur la plus haute marche du podium avec le trophée, à côté du deuxième avec la médaille d’argent, aux Championnats de Suisse 2022 à Sursee"],
    "Schweizermeisterschaften, Sursee, 2022 · Schweizermeister": ["Swiss Championships, Sursee, 2022 · Swiss champion", "Championnats de Suisse, Sursee, 2022 · Champion suisse"],
    "Schweizermeisterschaft 2022": ["Swiss Championships 2022", "Championnats de Suisse 2022"],
    "Eric setzt im Kumite einen hohen Fusstritt gegen seinen Gegner an": ["Eric throws a high kick at his opponent in kumite", "Eric lance un coup de pied haut contre son adversaire en kumite"],
    "Eric im Schweizer Gi mit blauen Schützern, konzentrierter Blick auf den Gegner": ["Eric in the Swiss gi with blue gloves, eyes focused on his opponent", "Eric en karaté-gi suisse avec des protections bleues, le regard concentré sur son adversaire"],
    "Eric wischt sich nach dem Kampf mit dem Handschuh übers Gesicht": ["Eric wipes his face with his glove after the bout", "Eric s’essuie le visage avec son gant après le combat"],
    "Eric schreit nach einem Punkt seine Anspannung heraus, auf der Anzeigetafel SUI Timmer": ["Eric lets out a shout after scoring, SUI Timmer on the scoreboard", "Eric pousse un cri après un point, SUI Timmer au tableau d’affichage"],
    "Eric ballt im Kampf die Faust, auf der Anzeigetafel steht es 3 zu 4": ["Eric clenches his fist mid-bout, the scoreboard reads 3 to 4", "Eric serre le poing en plein combat, le tableau affiche 3 à 4"],
    "Eric im Kampf bei Gleichstand, 5 zu 5 mit zehn Sekunden auf der Uhr": ["Eric in a tied bout, 5 to 5 with ten seconds on the clock", "Eric en plein combat à égalité, 5 à 5 avec dix secondes au chrono"],
    "Eric und sein Gegner umarmen sich nach dem Kampf": ["Eric and his opponent embrace after the bout", "Eric et son adversaire s’étreignent après le combat"],
    "Basel Open Masters, 2024 · Kumite −60 kg": ["Basel Open Masters, 2024 · Kumite −60 kg", "Basel Open Masters, 2024 · Kumité −60 kg"],
    "Basel Open Masters 2024": ["Basel Open Masters 2024", "Basel Open Masters 2024"],
    "WM 2015": ["Worlds 2015", "Mondial 2015"],
    "WSKF-Weltmeisterschaft, August 2015 · Vize-Weltmeister Kata U14": ["WSKF World Championships, August 2015 · World runner-up, kata U14", "Championnats du monde WSKF, août 2015 · Vice-champion du monde, kata U14"],
    "Der junge Eric zeigt seine Medaille, neben ihm ein Trainer in der Schweizer Jacke": ["Young Eric showing his medal, a coach in a Swiss jacket beside him", "Le jeune Eric montre sa médaille, un entraîneur en veste suisse à ses côtés"],
    "Eric mit zwei Teamkollegen vor dem Turnierplakat, vorne die Medaillen": ["Eric with two teammates in front of the tournament banner, medals in the foreground", "Eric avec deux coéquipiers devant l’affiche du tournoi, les médailles au premier plan"],
    "Archiv Eric Timmer": ["Eric Timmer’s archive", "Archives d’Eric Timmer"],
    "Angaben": ["Details", "Coordonnées"],
    "Wähle oben eine Stufe, dann geht es hier weiter.": ["Choose a tier above, then continue here.", "Choisis un niveau ci-dessus, puis continue ici."],
    "Angaben vervollständigen": ["Complete your details", "Compléter tes informations"],
    "Herzlichen Dank für die Unterstützung! Damit ich mich persönlich bei dir bedanken kann, brauche ich ein paar Angaben.": ["Thank you so much for your support! So that I can thank you personally, I need a few details.", "Merci beaucoup pour ton soutien ! Pour pouvoir te remercier personnellement, j’ai besoin de quelques informations."],
    "Vorname": ["First name", "Prénom"],
    "Nachname": ["Last name", "Nom"],
    "Adresse": ["Address", "Adresse"],
    "Strasse, PLZ, Ort": ["Street, postcode, town", "Rue, code postal, localité"],
    "Telefon (optional)": ["Phone (optional)", "Téléphone (facultatif)"],
    "Ich möchte die Gönner-Updates erhalten (1–2 pro Jahr mit Resultaten und Foto).": ["I’d like to receive the supporter updates (1–2 a year with results and a photo).", "Je souhaite recevoir les nouvelles des supporters (1–2 par an avec résultats et photo)."],
    "Mein Name darf auf der Webseite genannt werden.": ["My name may be mentioned on the website.", "Mon nom peut être mentionné sur le site."],
    "Weiter zur Zahlung": ["Continue to payment", "Continuer vers le paiement"],
    "Deine Angaben gehen über den Formular-Dienst Web3Forms direkt an mein E-Mail-Postfach.": ["Your details go straight to my email inbox via the form service Web3Forms.", "Tes informations arrivent directement dans ma boîte e-mail via le service de formulaires Web3Forms."],
    "Bestellung abschliessen": ["Complete your order", "Finaliser la commande"],
    "Betrag": ["Amount", "Montant"],
    "Vermerk": ["Reference", "Référence"],
    "Sobald dein Beitrag angekommen ist, melde ich mich persönlich bei dir.": ["As soon as your contribution has arrived, I’ll get in touch with you personally.", "Dès que ta contribution sera arrivée, je te contacterai personnellement."],
    "Stufe ändern": ["Change tier", "Changer de niveau"],
    "Ich möchte die Updates im WhatsApp-Kanal verfolgen (niemand sieht deine Nummer).": ["I’d like to follow the updates in the WhatsApp channel (nobody sees your number).", "Je souhaite suivre les nouvelles dans le canal WhatsApp (personne ne voit ton numéro)."],
    "Zum WhatsApp-Kanal": ["To the WhatsApp channel", "Vers le canal WhatsApp"],
    "Wenn du dem WhatsApp-Kanal beitrittst, gelten dafür die Datenschutzbestimmungen von WhatsApp (Meta). Als Kanal-Betreiber sehe ich deine Telefonnummer dabei nicht.": ["If you join the WhatsApp channel, WhatsApp’s (Meta’s) privacy terms apply. As the channel owner I do not see your phone number.", "Si tu rejoins le canal WhatsApp, les règles de confidentialité de WhatsApp (Meta) s’appliquent. En tant qu’administrateur du canal, je ne vois pas ton numéro de téléphone."],
    "WhatsApp-Kanal": ["WhatsApp channel", "Canal WhatsApp"],
    "So zahlst du per TWINT: In der TWINT-App auf «Senden» tippen, die Nummer eingeben, den Betrag und den Vermerk eintragen und bestätigen. Für die Banküberweisung nutzt du IBAN und Vermerk in deinem E-Banking.": ["How to pay with TWINT: in the TWINT app tap “Send”, enter the number, fill in the amount and the reference, and confirm. For a bank transfer, use the IBAN and the reference in your e-banking.", "Payer avec TWINT : dans l’appli TWINT, appuie sur « Envoyer », saisis le numéro, indique le montant et la référence, puis confirme. Pour un virement bancaire, utilise l’IBAN et la référence dans ton e-banking."],
    "Ich danke meinen Gönnerinnen und Gönnern von Herzen ♡": ["I thank my supporters from the bottom of my heart ♡", "Je remercie mes supporters de tout cœur ♡"],
    "Gönnerinnen und Gönner": ["Supporters", "Supporters"]
  };
  var UI = {
    statement: {
      de: 'Mit sechs Jahren stand ich zum ersten Mal auf der Matte. Heute kämpfe ich für die *Schweiz* gegen die Besten der Welt. Neben meiner KV-Lehre und mit rund zehn Trainings pro Woche. Mein Ziel ist klar: ganz *an* *die* *Spitze.*',
      en: 'I first stepped onto the mat at the age of six. Today I fight for *Switzerland* against the best in the world. Alongside my commercial apprenticeship, with around ten training sessions a week. My goal is clear: to reach the *top.*',
      fr: 'À six ans, je suis monté pour la première fois sur le tatami. Aujourd’hui, je combats pour la *Suisse* contre les meilleurs du monde. En parallèle de mon apprentissage commercial, avec une dizaine d’entraînements par semaine. Mon objectif est clair : atteindre le *sommet.*'
    },
    foto: { de: 'Foto', en: 'Photo', fr: 'Photo' },
    ua: { de: 'u. a.', en: 'and others', fr: 'et autres' },
    catSeriesA: { de: 'Series A', en: 'Series A', fr: 'Series A' },
    catPremier: { de: 'Premier League', en: 'Premier League', fr: 'Premier League' },
    catEm: { de: 'Europameisterschaft', en: 'European Championships', fr: 'Championnats d’Europe' },
    catWm: { de: 'Weltmeisterschaft', en: 'World Championships', fr: 'Championnats du monde' },
    catQuali: { de: 'WM-Quali', en: 'Worlds qualifier', fr: 'Qualif. mondiale' },
    catSwissLeague: { de: 'Swiss League', en: 'Swiss League', fr: 'Swiss League' },
    catOther: { de: 'Weiteres Turnier', en: 'Other tournament', fr: 'Autre tournoi' },
    calInfoOther: { de: 'Turnier-Info', en: 'Event info', fr: 'Infos tournoi' },
    catSwissSm: { de: 'Schweizermeisterschaft', en: 'Swiss Championships', fr: 'Championnats de Suisse' },
    calInfoSkf: { de: 'SKF-Info', en: 'SKF info', fr: 'Infos SKF' },
    calMe: { de: 'Ich bin am Start', en: 'I’m competing', fr: 'Je suis au départ' },
    calInfo: { de: 'WKF-Info', en: 'WKF info', fr: 'Infos WKF' },
    mapHint: { de: 'Tippe auf einen Punkt oder ein Land, um zum Turnier zu springen.', en: 'Tap a dot or a country to jump to the tournament.', fr: 'Touche un point ou un pays pour aller au tournoi.' },
    mapZoom: { de: 'Auf Turniere zoomen', en: 'Zoom to tournaments', fr: 'Zoomer sur les tournois' },
    mapWorld: { de: 'Ganze Welt', en: 'Whole world', fr: 'Monde entier' },
    mapGo: { de: 'Zum Turnier', en: 'To the tournament', fr: 'Vers le tournoi' },
    calEmpty: { de: 'Im Moment sind keine passenden Turniere im Kalender.', en: 'There are currently no matching tournaments in the calendar.', fr: 'Aucun tournoi correspondant n’est actuellement au calendrier.' },
    calFail: { de: 'Der Kalender konnte nicht geladen werden. Du findest ihn direkt bei der WKF: wkf.net/calendar', en: 'The calendar could not be loaded. You can find it directly at the WKF: wkf.net/calendar', fr: 'Le calendrier n’a pas pu être chargé. Tu le trouves directement chez la WKF : wkf.net/calendar' },
    formMissing: { de: 'Bitte fülle Name, eine gültige E-Mail-Adresse und deine Nachricht aus.', en: 'Please fill in your name, a valid email address and your message.', fr: 'Veuillez indiquer votre nom, une adresse e-mail valide et votre message.' },
    formFailed: { de: 'Das hat leider nicht geklappt. Schreib mir direkt an e.timmer@gmx.ch.', en: 'Sorry, that didn’t work. Please write to me directly at e.timmer@gmx.ch.', fr: 'Désolé, cela n’a pas fonctionné. Écrivez-moi directement à e.timmer@gmx.ch.' },
    formMail: { de: 'Stattdessen im E-Mail-Programm öffnen', en: 'Open in your email app instead', fr: 'Ouvrir dans votre application e-mail' },
    coThanks: { de: 'Danke, {n}! Deine Anmeldung ist bei mir angekommen. Zum Abschluss überweise bitte den Beitrag:', en: 'Thank you, {n}! Your sign-up has reached me. To finish, please transfer your contribution:', fr: 'Merci, {n} ! Ton inscription m’est bien parvenue. Pour terminer, merci de virer ta contribution :' },
    coMissing: { de: 'Bitte fülle Vorname, Nachname, eine gültige E-Mail-Adresse und deine Adresse aus.', en: 'Please fill in your first name, last name, a valid email address and your address.', fr: 'Merci d’indiquer ton prénom, ton nom, une adresse e-mail valide et ton adresse.' },
    gwDot: { de: 'Seite {n}', en: 'Page {n}', fr: 'Page {n}' },
    calRank: { de: 'WKF-Weltrang Nr. {r} · {p} Punkte', en: 'WKF world rank no. {r} · {p} points', fr: 'Classement mondial WKF n° {r} · {p} points' },
    sending: { de: 'Wird gesendet …', en: 'Sending …', fr: 'Envoi …' },
    mailBody: {
      de: 'Hallo Eric\n\nIch möchte deinem Gönnerclub beitreten: {t}.\n\nName:\nAdresse:\n\nLiebe Grüsse',
      en: 'Hi Eric\n\nI would like to join your supporters’ club: {t}.\n\nName:\nAddress:\n\nBest regards',
      fr: 'Bonjour Eric\n\nJe souhaite rejoindre ton club des supporters : {t}.\n\nNom :\nAdresse :\n\nMeilleures salutations'
    },
    copied: { de: 'Kopiert', en: 'Copied', fr: 'Copié' },
    selected: { de: 'Markiert', en: 'Selected', fr: 'Sélectionné' },
    desc: {
      de: 'Eric Timmer, Karateka aus Sisseln (AG). Schweizer Nationalkader, Kumite −60 kg, Nummer 52 der WKF-Weltrangliste.',
      en: 'Eric Timmer, karateka from Sisseln, Switzerland. Swiss National Team, kumite −60 kg, number 52 in the WKF world ranking.',
      fr: 'Eric Timmer, karatéka de Sisseln (AG). Équipe nationale suisse, kumité −60 kg, numéro 52 du classement mondial WKF.'
    }
  };
  var LANGS = ['de', 'en', 'fr'], lang = 'de';
  var i18nText = [], i18nAttr = [];
  Array.prototype.forEach.call(document.querySelectorAll('body *'), function (el) {
    if (el.tagName === 'SCRIPT' || el.id === 'statement') return;
    var h = el.innerHTML.trim();
    if (Object.prototype.hasOwnProperty.call(D, h)) i18nText.push([el, h]);
    ['alt', 'aria-label', 'data-sub', 'placeholder'].forEach(function (a) {
      var v = el.getAttribute(a);
      if (v && Object.prototype.hasOwnProperty.call(D, v)) i18nAttr.push([el, a, v]);
    });
  });
  function tr(k) { return lang === 'de' ? k : D[k][lang === 'en' ? 0 : 1]; }
  function T(k) { return UI[k][lang]; }

  /* Wort-für-Wort-Statement (*Wort* = rot) */
  var st = document.getElementById('statement'), wEls = [];
  function renderStatement(raw) {
    if (!st) return;
    st.innerHTML = raw.split(/\s+/).map(function (w) {
      var hl = /\*/.test(w);
      return '<span class="w' + (hl ? ' hl' : '') + '">' + w.replace(/\*/g, '') + '</span>';
    }).join(' ');
    wEls = Array.prototype.slice.call(st.querySelectorAll('.w'));
  }
  renderStatement(UI.statement.de);

  /* Reveal nur für Elemente, die beim Laden unterhalb des Bildschirms liegen */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.r'));
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.remove('pre'); onReveal(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) {
      if (el.getBoundingClientRect().top > vh) { el.classList.add('pre'); io.observe(el); }
    });
  }

  /* Weltrang-Marker: läuft beim Einblenden von 100 auf 52 */
  var me = document.getElementById('me'), tb = document.getElementById('trackbox');
  if (!reduce && tb && me && tb.classList.contains('pre')) { me.style.transition = 'none'; me.style.left = '98%'; void me.offsetWidth; me.style.transition = ''; }
  function onReveal(el) { if (tb && me && el === tb) me.style.left = '52%'; }

  /* Scroll: Panel-Zoom + Statement aufleuchten */
  var panel = document.getElementById('panel');
  function onScroll() {
    vh = window.innerHeight;
    if (!reduce && panel) {
      var r = panel.getBoundingClientRect();
      var k = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.9)));
      panel.style.transform = 'scale(' + (0.94 + 0.06 * k) + ')';
    }
    if (!st) return;
    var s = st.getBoundingClientRect();
    var p = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.85 - s.top) / (s.height + vh * 0.35)));
    var n = Math.round(p * wEls.length);
    for (var i = 0; i < wEls.length; i++) wEls[i].classList.toggle('on', i < n);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* Galerie */
  var g = document.getElementById('gallery'), prev = document.getElementById('prev'), next = document.getElementById('next'), dots = document.getElementById('dots');
  if (g) (function () {
  var cards = Array.prototype.slice.call(g.children);
  cards.forEach(function () { dots.appendChild(document.createElement('i')); });
  function step() { return cards[0].getBoundingClientRect().width + 20; }
  prev.addEventListener('click', function () { g.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }); });
  next.addEventListener('click', function () { g.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }); });
  function gal() {
    var max = g.scrollWidth - g.clientWidth;
    prev.disabled = g.scrollLeft < 4;
    next.disabled = g.scrollLeft > max - 4;
    var idx = Math.round(g.scrollLeft / step());
    if (g.scrollLeft > max - 4) idx = cards.length - 1;
    Array.prototype.forEach.call(dots.children, function (d, i) { d.classList.toggle('on', i === idx); });
  }
  g.addEventListener('scroll', gal, { passive: true });
  window.addEventListener('resize', gal);
  gal();
  })();

  /* Galerie-Tabs */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var galsub = document.getElementById('galsub');
  var thumbs = [];
  var curPanel = null;
  function useGallery(panel) {
    curPanel = panel;
    thumbs = Array.prototype.slice.call(panel.querySelectorAll('.gi'));
    if (galsub) galsub.innerHTML = panel.getAttribute('data-sub');
    var cid = panel.getAttribute('data-credit') || 'cr-kw';
    ['cr-kw', 'cr-skf', 'cr-paris', 'cr-priv', 'cr-wm23', 'cr-jem23'].forEach(function (id) { var c = document.getElementById(id); if (c) c.hidden = id !== cid; });
  }
  function centerTab(t) {
    var bar = t.parentNode, tr = t.getBoundingClientRect(), br = bar.getBoundingClientRect();
    bar.scrollLeft += (tr.left + tr.width / 2) - (br.left + br.width / 2);
  }
  window.addEventListener('load', function () {
    var on = document.querySelector('.tab[aria-selected="true"]');
    if (on) centerTab(on);
  });
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      centerTab(t);
      tabs.forEach(function (o) {
        var on = o === t, p = document.getElementById(o.getAttribute('aria-controls'));
        o.setAttribute('aria-selected', on ? 'true' : 'false');
        p.hidden = !on;
        if (on) { p.classList.remove('fade'); void p.offsetWidth; p.classList.add('fade'); useGallery(p); }
      });
    });
  });
  document.querySelectorAll('.masonry .gi').forEach(function (b) {
    b.addEventListener('click', function () { openLb(thumbs.indexOf(b)); });
  });
  var emgal = document.getElementById('emgal');
  if (emgal) useGallery(emgal);
  /* Galerie direkt mit einem Turnier öffnen: galerie.html#em / #basel / #skl / #paris / #wm */
  var hashTab = { '#em': 'tab-em', '#basel': 'tab-bom', '#skl': 'tab-skl', '#paris': 'tab-paris', '#wm': 'tab-wm', '#wm2015': 'tab-wm15', '#wm2023': 'tab-wm23', '#jem2023': 'tab-jem23', '#em2024': 'tab-em24', '#basel2022': 'tab-bom22', '#zadar2024': 'tab-emz24', '#yerevan2025': 'tab-emy25', '#basel2025': 'tab-bom25', '#wskf2018': 'tab-wc18', '#moskau2024': 'tab-mku24', '#jakarta2022': 'tab-jak22', '#kualalumpur2025': 'tab-kl25', '#sm2025': 'tab-sm25', '#sm2019': 'tab-sm19', '#sm2020': 'tab-sm20', '#sm2022': 'tab-sm22', '#basel2024': 'tab-bom24' }[location.hash];
  if (hashTab && document.getElementById(hashTab)) document.getElementById(hashTab).click();

  /* Foto-Lightbox */
  var lb = document.getElementById('lb'), lbimg = document.getElementById('lbimg'), lbcap = document.getElementById('lbcap'), lbcount = document.getElementById('lbcount');
  var cur = 0, lastFocus = null;
  function show(i) {
    cur = (i + thumbs.length) % thumbs.length;
    var t = thumbs[cur].querySelector('img');
    lbimg.src = t.getAttribute('src').replace('-sm.jpg', '.jpg');
    lbimg.alt = t.alt;
    lbcap.textContent = t.alt + ' · ' + T('foto') + ': ' + (curPanel && curPanel.getAttribute('data-by') || 'Kjetil Waber') + (curPanel && curPanel.hasAttribute('data-by-more') ? ' ' + T('ua') : '');
    lbcount.textContent = (cur + 1) + ' / ' + thumbs.length;
    var nx = new Image(); nx.src = thumbs[(cur + 1) % thumbs.length].querySelector('img').getAttribute('src').replace('-sm.jpg', '.jpg');
  }
  function openLb(i) { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; document.getElementById('lbx').focus(); }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  if (lb) {
  document.getElementById('lbx').addEventListener('click', closeLb);
  document.getElementById('lbp').addEventListener('click', function () { show(cur - 1); });
  document.getElementById('lbn').addEventListener('click', function () { show(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.tagName === 'FIGURE') closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowRight') show(cur + 1);
    else if (e.key === 'ArrowLeft') show(cur - 1);
  });
  var sx = null;
  lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
  });
  }

  /* E-Mail kopieren */
  var btn = document.getElementById('copy'), mail = document.getElementById('mail');
  if (btn) btn.addEventListener('click', function () {
    var done = function () { btn.textContent = T('copied'); setTimeout(function () { btn.textContent = tr('Kopieren'); }, 1800); };
    var fallback = function () { var rg = document.createRange(); rg.selectNodeContents(mail); var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(rg); btn.textContent = T('selected'); };
    try { navigator.clipboard.writeText(mail.textContent).then(done, fallback); } catch (e) { fallback(); }
  });

  /* Gönnerclub */
  var tiers = Array.prototype.slice.call(document.querySelectorAll('.tier'));
  var curTier = null;
  var coGrid = document.getElementById('co-grid'), coEmpty = document.getElementById('co-empty'), coForm = document.getElementById('co-form'), coPay = document.getElementById('co-pay');
  function setStep(n) {
    Array.prototype.forEach.call(document.querySelectorAll('.co-steps li'), function (li) {
      var s = +li.getAttribute('data-s');
      li.classList.toggle('on', s === n); li.classList.toggle('done', s < n);
    });
  }
  function tierData() {
    var q = function (c) { return curTier.querySelector(c); };
    return { name: q('.t-name').textContent, price: q('.t-price').textContent, per: q('.t-per').textContent, key: curTier.getAttribute('data-tier'), perks: q('.t-perk').innerHTML, img: q('.t-photo img') };
  }
  function refreshJoin() {
    if (!curTier || !coGrid) return;
    var d = tierData();
    coEmpty.hidden = true; coGrid.hidden = false;
    document.getElementById('co-tier').textContent = d.name;
    document.getElementById('co-price').textContent = d.price;
    document.getElementById('co-per').textContent = d.per;
    document.getElementById('co-perks').innerHTML = d.perks;
    var img = document.getElementById('co-img');
    if (d.img) { img.src = d.img.currentSrc || d.img.src; }
    var amt = d.price.replace(/[^0-9]/g, '');
    document.getElementById('co-amt').textContent = d.price;
    document.getElementById('co-amt-cp').setAttribute('data-copy', amt);
    document.getElementById('co-pub-ck').hidden = !(d.key === 'silber' || d.key === 'gold' || d.key === 'platin');
    if (!coPay.hidden) fillPay();
  }
  function fullName() { return (document.getElementById('co-first').value + ' ' + document.getElementById('co-last').value).trim(); }
  function fillPay() {
    var ref = 'Gönnerclub, ' + fullName();
    document.getElementById('co-ref').textContent = ref;
    document.getElementById('co-ref-cp').setAttribute('data-copy', ref);
    document.getElementById('co-thanks').textContent = T('coThanks').replace('{n}', document.getElementById('co-first').value.trim());
  }
  function tierLabel() {
    return curTier ? curTier.querySelector('.t-name').textContent + ' (' + curTier.querySelector('.t-price').textContent + ', ' + curTier.querySelector('.t-per').textContent + ')' : '';
  }

  /* Weltrang klein auf der Kalenderseite (Zahlen kommen aus assets/ranking.json, wird täglich aktualisiert) */
  var rankEl = document.getElementById('cal-rank'), rankData = null;
  function renderRank() {
    if (!rankEl || !rankData) return;
    rankEl.textContent = T('calRank').replace('{r}', rankData.rank).replace('{p}', rankData.points);
    rankEl.hidden = false;
  }
  if (rankEl) {
    fetch('assets/ranking.json?d=' + new Date().toISOString().slice(0, 10), { cache: 'no-cache' })
      .then(function (r) { return r.json(); })
      .then(function (d) { if (d && d.rank && d.points) { rankData = d; renderRank(); } })
      .catch(function () {});
  }

  /* Gönner-Wand: Namen aus assets/goenner.json, automatisch weiterschaltend und per Pfeil/Punkt bedienbar */
  var gw = { box: document.getElementById('gwall'), view: document.getElementById('gw-view'), dots: document.getElementById('gw-dots'),
    prev: document.getElementById('gw-prev'), next: document.getElementById('gw-next'), names: [], slides: [], i: 0, timer: 0, hold: false };
  function gwPer() { return window.innerWidth < 720 ? 3 : 5; }
  function gwShow(n) {
    if (!gw.slides.length) return;
    gw.i = (n + gw.slides.length) % gw.slides.length;
    gw.slides.forEach(function (el, k) { el.classList.toggle('on', k === gw.i); el.setAttribute('aria-hidden', k === gw.i ? 'false' : 'true'); });
    Array.prototype.forEach.call(gw.dots.children, function (d, k) { d.setAttribute('aria-current', k === gw.i ? 'true' : 'false'); });
  }
  function gwStop() { if (gw.timer) { clearInterval(gw.timer); gw.timer = 0; } }
  function gwPlay() {
    gwStop();
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || gw.slides.length < 2 || gw.hold) return;
    gw.timer = setInterval(function () { if (!document.hidden) gwShow(gw.i + 1); }, 4500);
  }
  function gwBuild() {
    if (!gw.box || !gw.names.length) return;
    var per = gwPer(), keep = gw.i;
    gw.view.innerHTML = ''; gw.dots.innerHTML = ''; gw.slides = [];
    for (var a = 0; a < gw.names.length; a += per) {
      var p = document.createElement('p'); p.className = 'gw-slide';
      gw.names.slice(a, a + per).forEach(function (n) { var s = document.createElement('span'); s.textContent = n; p.appendChild(s); });
      gw.view.appendChild(p); gw.slides.push(p);
      var d = document.createElement('button'); d.type = 'button'; d.className = 'gw-dot';
      d.setAttribute('aria-label', T('gwDot').replace('{n}', gw.slides.length));
      (function (k) { d.addEventListener('click', function () { gwShow(k); gwPlay(); }); })(gw.slides.length - 1);
      gw.dots.appendChild(d);
    }
    var many = gw.slides.length > 1;
    gw.prev.hidden = gw.next.hidden = gw.dots.hidden = !many;
    gwShow(Math.min(keep, gw.slides.length - 1));
    gwPlay();
  }
  if (gw.box) {
    fetch('assets/goenner.json?d=' + new Date().toISOString().slice(0, 10), { cache: 'no-cache' })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        gw.names = (d && d.names || []).filter(function (n) { return typeof n === 'string' && n.trim(); });
        if (!gw.names.length) return;
        gw.box.hidden = false; gwBuild();
      }).catch(function () {});
    gw.prev.addEventListener('click', function () { gwShow(gw.i - 1); gwPlay(); });
    gw.next.addEventListener('click', function () { gwShow(gw.i + 1); gwPlay(); });
    ['mouseenter', 'focusin', 'touchstart'].forEach(function (ev) { gw.box.addEventListener(ev, function () { gw.hold = true; gwStop(); }, { passive: true }); });
    ['mouseleave', 'focusout'].forEach(function (ev) { gw.box.addEventListener(ev, function () { gw.hold = false; gwPlay(); }); });
    gw.box.addEventListener('touchend', function () { setTimeout(function () { gw.hold = false; gwPlay(); }, 6000); }, { passive: true });
    gw.box.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') { gwShow(gw.i - 1); gwPlay(); } else if (e.key === 'ArrowRight') { gwShow(gw.i + 1); gwPlay(); } });
    var sx = null;
    gw.view.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    gw.view.addEventListener('touchend', function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 40) { gwShow(gw.i + (dx < 0 ? 1 : -1)); gwPlay(); } }, { passive: true });
    var lastPer = gwPer();
    window.addEventListener('resize', function () { var n = gwPer(); if (n !== lastPer) { lastPer = n; gw.i = 0; gwBuild(); } });
  }

  /* Kontaktfenster: Nachricht geht über Web3Forms direkt in Erics Postfach */
  var dlg = document.getElementById('cdlg'), cform = document.getElementById('cform'), cdone = document.getElementById('cf-done');
  var cErr = document.getElementById('cf-err'), cSend = document.getElementById('cf-send');
  var fName = document.getElementById('cf-name'), fMail = document.getElementById('cf-email'), fTopic = document.getElementById('cf-topic'), fMsg = document.getElementById('cf-msg');
  function openContact(topic, msg) {
    cform.hidden = false; cdone.hidden = true; cErr.hidden = true;
    if (topic) fTopic.value = topic;
    if (typeof msg === 'string') fMsg.value = msg;
    if (typeof dlg.showModal === 'function') { dlg.showModal(); } else { location.hash = '#kontakt'; return; }
    setTimeout(function () { (fName.value ? fMsg : fName).focus(); }, 50);
  }
  function closeContact() { if (dlg.open) dlg.close(); }
  document.querySelectorAll('[data-contact]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); openContact(); });
  });
  document.getElementById('cdx').addEventListener('click', closeContact);
  document.getElementById('cf-close').addEventListener('click', closeContact);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeContact(); });
  cform.addEventListener('input', function () { cErr.hidden = true; });
  cform.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = fName.value.trim(), mail = fMail.value.trim(), msg = fMsg.value.trim();
    if (!name || !msg || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) { cErr.textContent = T('formMissing'); cErr.hidden = false; return; }
    cErr.hidden = true; cSend.disabled = true; cSend.textContent = T('sending');
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: '23bdc631-34a0-4bd0-be37-fd5a39ea0e4b',
        subject: 'Webseite: ' + fTopic.value + ' von ' + name,
        from_name: 'erictimmer.ch',
        name: name, email: mail, replyto: mail,
        Thema: fTopic.value, Sprache: lang.toUpperCase(),
        message: msg,
        botcheck: document.getElementById('cf-honey').value
      })
    }).then(function (r) { return r.json(); }).then(function (d) {
      if (d && (d.success === true || d.success === 'true')) {
        cform.hidden = true; cdone.hidden = false; cform.reset();
      } else { throw new Error((d && d.message) || 'failed'); }
    }).catch(function (err) {
      try { console.warn('Kontaktformular:', err); } catch (e) {}
      var subj = 'Webseite: ' + fTopic.value + ' von ' + name;
      var body = msg + '\n\n' + name + ' <' + mail + '>';
      cErr.textContent = T('formFailed') + ' ';
      var a = document.createElement('a');
      a.href = 'mailto:e.timmer@gmx.ch?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
      a.textContent = T('formMail');
      cErr.appendChild(a); cErr.hidden = false;
    }).then(function () { cSend.disabled = false; cSend.textContent = tr('Nachricht senden'); });
  });
  tiers.forEach(function (t) {
    t.addEventListener('click', function () {
      tiers.forEach(function (o) { o.setAttribute('aria-pressed', o === t ? 'true' : 'false'); });
      curTier = t;
      if (coPay && !coPay.hidden) { coPay.hidden = true; coForm.hidden = false; }
      refreshJoin();
      setStep(2);
      var co = document.getElementById('checkout');
      if (co) co.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  var coChange = document.getElementById('co-change');
  if (coChange) coChange.addEventListener('click', function () {
    var g = document.getElementById('goenner'); if (g) g.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setStep(1);
  });
  if (coForm) {
    var coErr = document.getElementById('co-err'), coSend = document.getElementById('co-send');
    coForm.addEventListener('input', function () { coErr.hidden = true; });
    coForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!curTier) return;
      var v = function (id) { return document.getElementById(id).value.trim(); };
      var first = v('co-first'), last = v('co-last'), mail = v('co-mail'), adr = v('co-adr');
      if (!first || !last || !adr || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) { coErr.textContent = T('coMissing'); coErr.hidden = false; return; }
      var d = tierData(), name = first + ' ' + last;
      var fields = {
        Stufe: d.name, Betrag: d.price, Rhythmus: d.per, Name: name, 'E-Mail': mail, Adresse: adr,
        Telefon: v('co-tel') || '–',
        Gönner_Updates: document.getElementById('co-upd').checked ? 'Ja' : 'Nein',
        WhatsApp_Kanal: document.getElementById('co-wa-ck').checked ? 'Ja' : 'Nein',
        Namensnennung_Webseite: document.getElementById('co-pub-ck').hidden ? '–' : (document.getElementById('co-pub').checked ? 'Ja' : 'Nein'),
        Sprache: lang.toUpperCase()
      };
      var subj = 'Gönnerclub-Anmeldung: ' + d.name + ' (' + d.price + ') von ' + name;
      coErr.hidden = true; coSend.disabled = true; coSend.textContent = T('sending');
      var msg = Object.keys(fields).map(function (k) { return k.replace(/_/g, ' ') + ': ' + fields[k]; }).join('\n');
      var payload = { access_key: '23bdc631-34a0-4bd0-be37-fd5a39ea0e4b', subject: subj, from_name: 'erictimmer.ch', name: name, email: mail, replyto: mail, message: msg, botcheck: document.getElementById('co-honey').value };
      Object.keys(fields).forEach(function (k) { payload[k] = fields[k]; });
      fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { return r.json(); }).then(function (res) {
          if (!(res && (res.success === true || res.success === 'true'))) throw new Error((res && res.message) || 'failed');
          coForm.hidden = true; coPay.hidden = false; fillPay(); setStep(3);
          document.getElementById('co-wa').hidden = !document.getElementById('co-wa-ck').checked;
          document.getElementById('checkout').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }).catch(function (err) {
          try { console.warn('Gönnerclub-Anmeldung:', err); } catch (x) {}
          coErr.textContent = T('formFailed') + ' ';
          var a = document.createElement('a');
          a.href = 'mailto:e.timmer@gmx.ch?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(msg);
          a.textContent = T('formMail');
          coErr.appendChild(a); coErr.hidden = false;
        }).then(function () { coSend.disabled = false; coSend.textContent = tr('Weiter zur Zahlung'); });
    });
  }

  document.querySelectorAll('.payrow .cp').forEach(function (b) {
    b.addEventListener('click', function () {
      var val = b.getAttribute('data-copy'), row = b.parentNode.querySelector('.pv');
      var ok = function () { b.textContent = T('copied'); setTimeout(function () { b.textContent = tr('Kopieren'); }, 1800); };
      var fb = function () { var rg = document.createRange(); rg.selectNodeContents(row); var s = window.getSelection(); s.removeAllRanges(); s.addRange(rg); b.textContent = T('selected'); };
      try { navigator.clipboard.writeText(val).then(ok, fb); } catch (e) { fb(); }
    });
  });

  /* Turnierkalender (Daten: assets/calendar.json, täglich von der WKF abgeglichen) */
  var CAL = null, calFail = false, calFilter = 'all';
  var CAL_LOC = { de: 'de-CH', en: 'en-GB', fr: 'fr-CH' };
  var CAL_CAT = { 'series-a': 'catSeriesA', 'premier-league': 'catPremier', em: 'catEm', wm: 'catWm', quali: 'catQuali', 'swiss-league': 'catSwissLeague', 'swiss-sm': 'catSwissSm', other: 'catOther' };
  function calDate(s) { var a = s.split('-'); return new Date(+a[0], +a[1] - 1, +a[2]); }
  function calMon(d, style) { return d.toLocaleDateString(CAL_LOC[lang], { month: style }).replace(/\./g, ''); }
  function calDay(d) { return d.getDate() + (lang === 'de' ? '.' : ''); }
  function calRange(a, b) {
    if (a.getTime() === b.getTime()) return calDay(a) + ' ' + calMon(a, 'long') + ' ' + a.getFullYear();
    if (a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()) return calDay(a) + '–' + calDay(b) + ' ' + calMon(a, 'long') + ' ' + a.getFullYear();
    return calDay(a) + ' ' + calMon(a, 'short') + ' – ' + calDay(b) + ' ' + calMon(b, 'short') + ' ' + b.getFullYear();
  }
  function calEl(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  /* Weltkarte im Kalender (Karte: assets/worldmap.json, Equal-Earth-Projektion, Natural Earth) */
  var MAP = null, mapReq = false, mapList = [], mapSel = null, mapZoomed = window.innerWidth < 700, mapVB = null, mapAnim = 0;
  var CITY = {
    tbilisi: [41.72, 44.79], istanbul: [41.01, 28.98], rome: [41.9, 12.5], roma: [41.9, 12.5], marseille: [43.3, 5.37], tarragona: [41.12, 1.25],
    astana: [51.17, 71.43], rabat: [34.02, -6.83], amman: [31.95, 35.93], salzburg: [47.81, 13.04], tangier: [35.77, -5.8],
    'milano bergamo': [45.55, 9.4], milano: [45.46, 9.19], milan: [45.46, 9.19], bergamo: [45.7, 9.67], madrid: [40.42, -3.7], paris: [48.86, 2.35],
    budapest: [47.5, 19.04], baku: [40.41, 49.87], cairo: [30.04, 31.24], dubai: [25.2, 55.27], tokyo: [35.68, 139.69], 'kuala lumpur': [3.14, 101.69],
    moscow: [55.75, 37.62], sursee: [47.17, 8.11], kreuzlingen: [47.65, 9.18], biel: [47.14, 7.25], 'züri oberland': [47.3, 8.76], kriens: [47.03, 8.28], jakarta: [-6.2, 106.85], guadalajara: [20.67, -103.35], lima: [-12.05, -77.04], 'santiago de chile': [-33.45, -70.67], cairns: [-16.92, 145.77]
  };
  var CTRY = { 'türkiye': 'Turkey', turkiye: 'Turkey', usa: 'United States of America', 'united states': 'United States of America', 'czech republic': 'Czechia', korea: 'South Korea', 'republic of korea': 'South Korea', uae: 'United Arab Emirates', 'bosnia and herzegovina': 'Bosnia and Herz.', 'dominican republic': 'Dominican Rep.', 'north macedonia': 'North Macedonia', 'hong kong': 'China', 'chinese taipei': 'Taiwan' };
  var EG = { A1: 1.340264, A2: -0.081106, A3: 0.000893, A4: 0.003796, M: Math.sqrt(3) / 2 };
  function mapXY(lat, lon) {
    var l = Math.asin(EG.M * Math.sin(lat * Math.PI / 180)), l2 = l * l, l6 = l2 * l2 * l2, lam = lon * Math.PI / 180;
    var x = lam * Math.cos(l) / (EG.M * (EG.A1 + 3 * EG.A2 * l2 + l6 * (7 * EG.A3 + 9 * EG.A4 * l2)));
    var y = l * (EG.A1 + EG.A2 * l2 + l6 * (EG.A3 + EG.A4 * l2));
    return [MAP.k * x + MAP.tx, -MAP.k * y + MAP.ty];
  }
  function svgEl(tag, attrs) { var e = document.createElementNS('http://www.w3.org/2000/svg', tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function mapCountry(e) {
    var p = (e.city || '').split(','), c = (p[p.length - 1] || '').trim();
    return CTRY[c.toLowerCase()] || c;
  }
  function mapPos(e) {
    var p = (e.city || '').split(','), city = (p[0] || '').trim().toLowerCase();
    if (CITY[city]) return mapXY(CITY[city][0], CITY[city][1]);
    var path = MAP.paths[mapCountry(e)];
    if (path) { var b = path.getBBox(); return [b.x + b.width / 2, b.y + b.height / 2]; }
    return null;
  }
  function mapSetVB(x, y, w, h) {
    mapVB = [x, y, w, h];
    var svg = document.querySelector('#calmap svg'); if (!svg) return;
    svg.setAttribute('viewBox', x + ' ' + y + ' ' + w + ' ' + h);
    var px = svg.getBoundingClientRect().width || 480, u = w / px, d = Math.min(6, 3.2 + (MAP.w / w - 1) * 1.2);
    Array.prototype.forEach.call(svg.querySelectorAll('.mk'), function (g) {
      g.querySelector('.dot').setAttribute('r', (d * u).toFixed(2));
      g.querySelector('.ring').setAttribute('r', ((d + 3.5) * u).toFixed(2));
      g.querySelector('.hit').setAttribute('r', ((d > 4.5 ? d + 4 : d + 1.5) * u).toFixed(2));
      g.querySelector('.dot').style.strokeWidth = (1.2 * u).toFixed(2);
      g.querySelector('.ring').style.strokeWidth = (1.5 * u).toFixed(2);
      var ct = g.querySelector('.cnt'); if (ct) { ct.style.fontSize = (d * 1.5 * u).toFixed(2) + 'px'; ct.style.display = d > 4.5 ? '' : 'none'; ct.setAttribute('y', (d * 0.52 * u).toFixed(2)); }
    });
  }
  function mapTarget() {
    if (!mapZoomed || !mapList.length) return [0, 0, MAP.w, MAP.h];
    var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    mapList.forEach(function (e) { var p = mapPos(e); if (p) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); } });
    if (x0 > x1) return [0, 0, MAP.w, MAP.h];
    var w = Math.max(x1 - x0 + 150, 260), h = w * MAP.h / MAP.w;
    if (h < y1 - y0 + 90) { h = y1 - y0 + 90; w = h * MAP.w / MAP.h; }
    var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    var x = Math.min(Math.max(cx - w / 2, 0), MAP.w - w), y = Math.min(Math.max(cy - h / 2, 0), MAP.h - h);
    return [x, y, w, h];
  }
  function mapAnimate(to) {
    cancelAnimationFrame(mapAnim);
    var from = mapVB || [0, 0, MAP.w, MAP.h], t0 = null, dur = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 450;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = dur ? Math.min((ts - t0) / dur, 1) : 1, q = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      mapSetVB(from[0] + (to[0] - from[0]) * q, from[1] + (to[1] - from[1]) * q, from[2] + (to[2] - from[2]) * q, from[3] + (to[3] - from[3]) * q);
      if (p < 1) mapAnim = requestAnimationFrame(step);
    }
    mapAnim = requestAnimationFrame(step);
  }
  function mapSelect(id, scroll) {
    mapSel = id;
    var ev = null;
    mapList.forEach(function (e) { if (e.id === id) ev = e; });
    Array.prototype.forEach.call(document.querySelectorAll('.ce.sel'), function (n) { n.classList.remove('sel'); });
    Array.prototype.forEach.call(document.querySelectorAll('#calmap .mk.sel, #calmap .cn.sel'), function (n) { n.classList.remove('sel'); });
    var info = document.getElementById('mapinfo'); if (!info) return;
    info.innerHTML = '';
    if (!ev) { info.appendChild(calEl('p', 'mi-hint', T('mapHint'))); return; }
    var li = document.getElementById('ev-' + ev.id); if (li) { li.classList.add('sel'); if (scroll) li.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' }); }
    var g = document.querySelector('#calmap .mk[data-evs*="|' + ev.id + '|"]'); if (g) g.classList.add('sel');
    var cn = MAP.paths[mapCountry(ev)]; if (cn) cn.classList.add('sel');
    var a = calDate(ev.start), b = calDate(ev.end);
    info.appendChild(calEl('div', 'ce-tags')).appendChild(calEl('span', 'ce-t c-' + ev.cat, T(CAL_CAT[ev.cat])));
    if (ev.eric) info.firstChild.appendChild(calEl('span', 'ce-t ce-me', T('calMe')));
    info.appendChild(calEl('h3', '', ev.name));
    info.appendChild(calEl('p', '', (ev.city ? ev.city + ' · ' : '') + calRange(a, b)));
    var go = calEl('a', 'go chev', T('mapGo')); go.href = ev.url; go.target = '_blank'; go.rel = 'noopener';
    go.setAttribute('aria-label', T('mapGo') + ': ' + ev.name);
    info.appendChild(go);
  }
  function renderMap(list) {
    mapList = list;
    var box = document.getElementById('calmapbox'); if (!box) return;
    if (!MAP) {
      if (!mapReq) {
        mapReq = true;
        fetch('assets/worldmap.json').then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (j) {
          MAP = j; MAP.paths = {};
          var svg = svgEl('svg', { viewBox: '0 0 ' + j.w + ' ' + j.h, role: 'group', 'aria-label': tr('Weltkarte der Turniere') });
          var gc = svgEl('g', {});
          j.c.forEach(function (c) { var p = svgEl('path', { d: c.d, 'class': 'cn' }); p.setAttribute('data-n', c.n); MAP.paths[c.n] = p; gc.appendChild(p); });
          svg.appendChild(gc); svg.appendChild(svgEl('g', { id: 'mapmk' }));
          document.getElementById('calmap').appendChild(svg);
          mapVB = [0, 0, j.w, j.h];
          renderMap(mapList);
        }).catch(function () { box.hidden = true; });
      }
      return;
    }
    if (!list.length) { box.hidden = true; return; }
    box.hidden = false;
    Object.keys(MAP.paths).forEach(function (n) { MAP.paths[n].classList.remove('has', 'sel'); });
    var gm = document.getElementById('mapmk'); gm.innerHTML = '';
    var byCountry = {};
    list.forEach(function (e) { var c = mapCountry(e); if (MAP.paths[c]) { MAP.paths[c].classList.add('has'); (byCountry[c] = byCountry[c] || []).push(e); } });
    Object.keys(byCountry).forEach(function (c) {
      var p = MAP.paths[c];
      p.onclick = function () {
        var arr = byCountry[c], i = 0;
        arr.forEach(function (e, n) { if (e.id === mapSel) i = (n + 1) % arr.length; });
        mapSelect(arr[i].id, true);
      };
    });
    var groups = [];
    list.forEach(function (e) {
      var pos = mapPos(e); if (!pos) return;
      var hit = null;
      groups.forEach(function (g) { if (!hit && g.c === mapCountry(e) && Math.hypot(g.x - pos[0], g.y - pos[1]) < 7) hit = g; });
      if (hit) { hit.evs.push(e); hit.x = (hit.x * (hit.evs.length - 1) + pos[0]) / hit.evs.length; hit.y = (hit.y * (hit.evs.length - 1) + pos[1]) / hit.evs.length; }
      else groups.push({ x: pos[0], y: pos[1], evs: [e], c: mapCountry(e) });
    });
    groups.forEach(function (gr) {
      var ids = gr.evs.map(function (e) { return e.id; }), me = gr.evs.some(function (e) { return e.eric; });
      var label = gr.evs.map(function (e) { return e.name + ', ' + (e.city || ''); }).join('; ');
      var g = svgEl('g', { 'class': 'mk' + (me ? ' me' : ''), tabindex: '0', role: 'link', 'data-ev': ids[0], 'data-evs': '|' + ids.join('|') + '|', 'aria-label': label });
      g.setAttribute('transform', 'translate(' + gr.x.toFixed(1) + ' ' + gr.y.toFixed(1) + ')');
      g.appendChild(svgEl('circle', { 'class': 'hit', cx: 0, cy: 0 }));
      g.appendChild(svgEl('circle', { 'class': 'ring', cx: 0, cy: 0 }));
      g.appendChild(svgEl('circle', { 'class': 'dot', cx: 0, cy: 0 }));
      if (ids.length > 1) { var tx = svgEl('text', { 'class': 'cnt', x: 0, y: 0 }); tx.textContent = ids.length; g.appendChild(tx); }
      function pick() { var i = ids.indexOf(mapSel); mapSelect(ids[(i + 1) % ids.length], true); }
      g.addEventListener('click', pick);
      g.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); pick(); } });
      gm.appendChild(g);
    });
    var zb = document.getElementById('mapzoom');
    zb.textContent = mapZoomed ? T('mapWorld') : T('mapZoom'); zb.setAttribute('aria-pressed', mapZoomed ? 'true' : 'false');
    var tg = mapTarget(); mapSetVB(tg[0], tg[1], tg[2], tg[3]);
    var still = list.some(function (e) { return e.id === mapSel; });
    mapSelect(still ? mapSel : null, false);
    Array.prototype.forEach.call(document.querySelectorAll('#cal .ce'), function (li) {
      var id = +li.getAttribute('data-ev');
      li.addEventListener('mouseenter', function () { var g = document.querySelector('#calmap .mk[data-evs*="|' + id + '|"]'); if (g) g.classList.add('sel'); });
      li.addEventListener('mouseleave', function () { var g = document.querySelector('#calmap .mk[data-evs*="|' + id + '|"]'); if (g && !(mapSel != null && g.getAttribute('data-evs').indexOf('|' + mapSel + '|') >= 0)) g.classList.remove('sel'); });
    });
  }
  (function () {
    var zb = document.getElementById('mapzoom');
    if (zb) zb.addEventListener('click', function () {
      mapZoomed = !mapZoomed; zb.textContent = mapZoomed ? T('mapWorld') : T('mapZoom'); zb.setAttribute('aria-pressed', mapZoomed ? 'true' : 'false');
      if (MAP) mapAnimate(mapTarget());
    });
    window.addEventListener('resize', function () { if (MAP && mapVB) mapSetVB(mapVB[0], mapVB[1], mapVB[2], mapVB[3]); });
  })();

  function renderCal() {
    var boxes = Array.prototype.slice.call(document.querySelectorAll('#cal, #calnext'));
    if (!boxes.length) return;
    var t = new Date(), today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    boxes.forEach(function (box) {
      box.innerHTML = '';
      if (calFail) { box.appendChild(calEl('p', 'cal-note', T('calFail'))); return; }
      if (!CAL) return;
      var limit = +box.getAttribute('data-limit') || 0, grouped = !limit;
      var list = CAL.filter(function (e) { return calDate(e.end) >= today && (calFilter === 'all' || e.cat === calFilter || !grouped); });
      if (limit) list = list.slice(0, limit);
      if (!list.length) { box.appendChild(calEl('p', 'cal-note', T('calEmpty'))); if (box.id === 'cal') renderMap(list); return; }
      var ul = calEl('ul', 'cal-list'), lastKey = '';
      list.forEach(function (e) {
        var a = calDate(e.start), b = calDate(e.end);
        if (grouped) {
          var key = a.getFullYear() + '-' + a.getMonth();
          if (key !== lastKey) { lastKey = key; ul.appendChild(calEl('li', 'cal-mh', a.toLocaleDateString(CAL_LOC[lang], { month: 'long', year: 'numeric' }))); }
        }
        var li = calEl('li', 'ce' + (e.eric ? ' me' : ''));
        li.id = 'ev-' + e.id; li.setAttribute('data-ev', e.id);
        var d = calEl('div', 'ce-d');
        d.appendChild(calEl('b', '', a.getTime() === b.getTime() ? String(a.getDate()) : a.getDate() + '–' + b.getDate()));
        d.appendChild(calEl('span', '', calMon(a, 'short') + (a.getMonth() !== b.getMonth() ? '–' + calMon(b, 'short') : '')));
        var m = calEl('div', 'ce-m');
        var tags = calEl('div', 'ce-tags');
        tags.appendChild(calEl('span', 'ce-t c-' + e.cat, T(CAL_CAT[e.cat])));
        if (e.eric) tags.appendChild(calEl('span', 'ce-t ce-me', T('calMe')));
        m.appendChild(tags);
        m.appendChild(calEl('h3', '', e.name));
        m.appendChild(calEl('p', '', (e.city ? e.city + ' · ' : '') + calRange(a, b)));
        var go = calEl('a', 'go chev', T(e.src === 'skf' ? 'calInfoSkf' : e.src === 'sportdata' ? 'calInfoOther' : 'calInfo'));
        go.href = e.url; go.target = '_blank'; go.rel = 'noopener';
        go.setAttribute('aria-label', T(e.src === 'skf' ? 'calInfoSkf' : e.src === 'sportdata' ? 'calInfoOther' : 'calInfo') + ': ' + e.name);
        li.appendChild(d); li.appendChild(m); li.appendChild(go);
        ul.appendChild(li);
      });
      box.appendChild(ul);
      if (box.id === 'cal') renderMap(list);
    });
  }
  (function () {
    var chips = document.getElementById('calchips');
    if (chips) chips.addEventListener('click', function (ev) {
      var b = ev.target.closest('button[data-f]'); if (!b) return;
      calFilter = b.getAttribute('data-f');
      Array.prototype.forEach.call(chips.querySelectorAll('button'), function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      renderCal();
    });
    if (!document.getElementById('cal') && !document.getElementById('calnext')) return;
    var day = new Date().toISOString().slice(0, 10);
    fetch('assets/calendar.json?d=' + day).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (j) { CAL = j.events || []; renderCal(); })
      .catch(function () { calFail = true; renderCal(); });
  })();

  /* Sprache wechseln */
  var metaDesc = document.querySelector('meta[name="description"]');
  var langBtns = Array.prototype.slice.call(document.querySelectorAll('.lang button'));
  function setLang(l, remember) {
    if (LANGS.indexOf(l) < 0) l = 'de';
    lang = l;
    document.documentElement.lang = l;
    i18nText.forEach(function (n) { n[0].innerHTML = tr(n[1]); });
    i18nAttr.forEach(function (n) { n[0].setAttribute(n[1], tr(n[2])); });
    renderStatement(UI.statement[l]);
    onScroll();
    if (curPanel && galsub) galsub.innerHTML = curPanel.getAttribute('data-sub');
    if (lb && !lb.hidden) show(cur);
    refreshJoin();
    renderRank();
    if (gw.slides.length) Array.prototype.forEach.call(gw.dots.children, function (d, n) { d.setAttribute('aria-label', T('gwDot').replace('{n}', n + 1)); });
    renderCal();
    if (metaDesc) metaDesc.setAttribute('content', T('desc'));
    var pg = document.body.getAttribute('data-page');
    document.title = (pg ? tr(pg) + ' · ' : '') + 'Eric Timmer';
    langBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l ? 'true' : 'false'); });
    if (remember) {
      try { localStorage.setItem('lang', l); } catch (e) {}
      try { history.replaceState(null, '', (l === 'de' ? location.pathname : '?lang=' + l) + location.hash); } catch (e) {}
    }
  }
  langBtns.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); });
  });
  /* Menü auf dem Handy */
  var navTop = document.querySelector('nav.top'), menuBtn = document.getElementById('menubtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = !navTop.classList.contains('open');
      navTop.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { navTop.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); });
    });
  }

  var start = null;
  try { start = new URLSearchParams(location.search).get('lang'); } catch (e) {}
  if (LANGS.indexOf(start) >= 0) { try { localStorage.setItem('lang', start); } catch (e) {} }
  if (LANGS.indexOf(start) < 0) { try { start = localStorage.getItem('lang'); } catch (e) { start = null; } }
  if (LANGS.indexOf(start) < 0) {
    start = 'de';
    var nav = navigator.languages || [navigator.language || 'de'];
    for (var i = 0; i < nav.length; i++) {
      var c = String(nav[i]).slice(0, 2).toLowerCase();
      if (LANGS.indexOf(c) >= 0) { start = c; break; }
    }
  }
  if (start !== 'de') setLang(start, false);
})();

/* Menü nimmt beim Scrollen die Farbe des Bereichs darunter an */
(function () {
  var nav = document.querySelector('nav.top');
  if (!nav) return;
  var bands = [].slice.call(document.querySelectorAll('.band.dark, .band.contact'));
  if (!bands.length) return;
  var tone = '', ticking = false;
  function update() {
    ticking = false;
    var half = window.innerWidth < 735 ? 40 : 60, y = nav.offsetHeight / 2, t = '';
    for (var i = 0; i < bands.length; i++) {
      var r = bands[i].getBoundingClientRect();
      if (r.top + half < y && r.bottom - half > y) { t = bands[i].classList.contains('contact') ? 'red' : 'dark'; break; }
    }
    if (t !== tone) { tone = t; if (t) nav.setAttribute('data-tone', t); else nav.removeAttribute('data-tone'); }
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  window.addEventListener('load', req);
  update();
})();

/* Zeitstrahl auf der Erfolge-Seite: Jahr anfahren oder antippen, dann zeigt sich, was passiert ist */
(function () {
  var tl = document.getElementById('tl'), sc = document.getElementById('tlscroll');
  if (!tl || !sc) return;
  var tabs = [].slice.call(tl.querySelectorAll('.tl-y')), older = document.getElementById('tlold'), newer = document.getElementById('tlnew');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  tl.classList.add('on');
  function panel(t) { return document.getElementById(t.getAttribute('aria-controls')); }
  function select(t, center, focus) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.classList.toggle('on', on); x.setAttribute('aria-selected', on ? 'true' : 'false'); x.tabIndex = on ? 0 : -1;
      var p = panel(x); if (p) p.classList.toggle('sel', on);
    });
    if (center) sc.scrollTo({ left: t.offsetLeft - sc.clientWidth / 2 + t.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
    if (focus) t.focus({ preventScroll: true });
  }
  function edges() {
    var max = sc.scrollWidth - sc.clientWidth;
    if (older) older.disabled = sc.scrollLeft <= 2;
    if (newer) newer.disabled = sc.scrollLeft >= max - 2;
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t, true, false); });
    t.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') select(t, false, false); });
    t.addEventListener('keydown', function (e) {
      var j = i;
      if (e.key === 'ArrowLeft') j = Math.max(0, i - 1);
      else if (e.key === 'ArrowRight') j = Math.min(tabs.length - 1, i + 1);
      else if (e.key === 'Home') j = 0;
      else if (e.key === 'End') j = tabs.length - 1;
      else return;
      e.preventDefault(); select(tabs[j], true, true);
    });
  });
  function step(dir) { sc.scrollBy({ left: dir * sc.clientWidth * 0.6, behavior: reduce ? 'auto' : 'smooth' }); }
  if (older) older.addEventListener('click', function () { step(-1); });
  if (newer) newer.addEventListener('click', function () { step(1); });
  sc.addEventListener('scroll', edges, { passive: true });
  window.addEventListener('resize', function () { edges(); });
  function toEnd() { sc.scrollLeft = sc.scrollWidth; edges(); }
  select(tabs[tabs.length - 1], false, false);
  toEnd(); window.addEventListener('load', toEnd);
})();

/* Eröffnungs-Animation der Startseite neu abspielen: bei Zurück-Navigation (Seite aus dem Cache)
   und wenn die Seite in einem Hintergrund-Tab geladen wurde (dann erst beim ersten Anschauen). */
(function () {
  var h = document.documentElement;
  if (!document.querySelector('.hero-split')) return;
  function play() { h.classList.remove('intro'); void h.offsetWidth; h.classList.add('intro'); }
  window.addEventListener('pageshow', function (e) { if (e.persisted) play(); });
  if (document.visibilityState === 'hidden') {
    document.addEventListener('visibilitychange', function once() {
      if (document.visibilityState === 'visible') { document.removeEventListener('visibilitychange', once); play(); }
    });
  }
})();

/* Schwebender roter Punkt, der der Maus folgt (nur mit Maus, nicht bei «Bewegung reduzieren»).
   Zeitbasiert geglättet, damit er auf jedem Bildschirm (60/120 Hz) gleich weich schwebt. */
(function () {
  if (!window.matchMedia || !matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var d = document.createElement('div');
  d.className = 'cursor-dot'; d.setAttribute('aria-hidden', 'true'); d.appendChild(document.createElement('i'));
  document.body.appendChild(d);
  var x = 0, y = 0, cx = 0, cy = 0, last = 0, running = false;
  function loop(t) {
    var dt = last ? Math.min(t - last, 64) : 16.7; last = t;
    var k = 1 - Math.pow(1 - 0.16, dt / 16.7);
    cx += (x - cx) * k; cy += (y - cy) * k;
    d.style.transform = 'translate3d(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px,0)';
    if (Math.abs(x - cx) > 0.1 || Math.abs(y - cy) > 0.1) requestAnimationFrame(loop); else { running = false; last = 0; }
  }
  var hot = 'a, button, [role="button"], input, textarea, select, label, summary, .tl-y, .gi';
  window.addEventListener('mousemove', function (e) {
    x = e.clientX; y = e.clientY;
    if (!d.classList.contains('on')) { cx = x; cy = y; d.classList.add('on'); }
    d.classList.toggle('big', !!(e.target.closest && e.target.closest(hot)));
    if (!running) { running = true; requestAnimationFrame(loop); }
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', function () { d.classList.remove('on'); });
  window.addEventListener('mousedown', function () { d.classList.add('press'); });
  window.addEventListener('mouseup', function () { d.classList.remove('press'); });
})();

/* Nach dem Intro die Klasse «intro» entfernen, damit der Browser die Animations-Ebenen freigibt
   (Endzustand = Normalzustand, es springt also nichts). */
(function () {
  var h = document.documentElement, tmr;
  function arm() { clearTimeout(tmr); tmr = setTimeout(function () { if (document.visibilityState === 'visible') h.classList.remove('intro'); else arm(); }, 4500); }
  if (h.classList.contains('intro')) arm();
  new MutationObserver(function () { if (h.classList.contains('intro')) arm(); }).observe(h, { attributes: true, attributeFilter: ['class'] });
})();

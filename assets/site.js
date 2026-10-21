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
    'August 2015 · Tokyo': ['August 2015 · Tokyo', 'Août 2015 · Tokyo'],
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
    'Europameisterschaft in Zadar, Kroatien': ['European Championships in Zadar, Croatia', 'Championnats d’Europe à Zadar, Croatie'],
    'Karate 1 Series A in Salzburg': ['Karate 1 Series A in Salzburg', 'Karate 1 Series A à Salzbourg'],
    'Internationales Trainingslager in Deutschland': ['International training camp in Germany', 'Camp d’entraînement international en Allemagne'],
    'Elite-Weltmeisterschaft in Budapest': ['Senior World Championships in Budapest', 'Championnats du monde seniors à Budapest'],
    'EM-Debüt bei der Elite in Guadalajara, Spanien': ['Senior European Championships debut in Guadalajara, Spain', 'Débuts aux Championnats d’Europe seniors à Guadalajara, Espagne'],
    'Gleichzeitig im Junioren- und im Elite-Nationalkader': ['In the junior and senior national teams at the same time', 'Membre à la fois des cadres nationaux juniors et seniors'],
    'Erste Starts auf der Karate-1-Weltserie der Erwachsenen <span>· Türkei und Indonesien</span>': ['First senior Karate 1 world series events <span>· Turkey and Indonesia</span>', 'Premiers tournois du circuit mondial Karate 1 seniors <span>· Turquie et Indonésie</span>'],
    'Dreifacher World-Series-Sieger U16 <span>· inklusive Team-Gold</span>': ['Three-time World Series winner U16 <span>· including team gold</span>', 'Triple vainqueur des World Series U16 <span>· dont l’or par équipe</span>'],
    'Vize-Weltmeister Kata U14 an der WSKF-WM in Tokyo': ['World runner-up in kata U14 at the WSKF Worlds in Tokyo', 'Vice-champion du monde de kata U14 aux Mondiaux WSKF à Tokyo'],
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
    'Physio Henrich, hält meinen Körper wettkampfbereit.': ['Physio Henrich, keeps my body ready to compete.', 'Physio Henrich, garde mon corps prêt pour la compétition.'],
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
    'Trainer, Mentalcoach, Physio und Verein': ['Coaches, mental coach, physio and club', 'Entraîneurs, coach mental, physio et club'],
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
    'Deine Nachricht wird über den Formular-Dienst FormSubmit an mein E-Mail-Postfach weitergeleitet.': ['Your message is forwarded to my inbox via the form service FormSubmit.', 'Votre message est transmis à ma boîte e-mail via le service de formulaires FormSubmit.'],
    'Danke!': ['Thank you!', 'Merci !'],
    'Deine Nachricht ist unterwegs. Ich melde mich bald bei dir.': ['Your message is on its way. I’ll get back to you soon.', 'Votre message est en route. Je vous réponds bientôt.'],
    'Schreib mir deinen Namen und deine Adresse, damit ich dir die Autogrammkarte schicken kann.': ['Include your name and address so I can send you the autograph card.', 'Indiquez votre nom et votre adresse pour que je puisse vous envoyer la carte autographe.'],
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
    'Fotos: Kjetil Waber, foto-kjetil.ch / Swiss Karate Federation.': ['Photos: Kjetil Waber, foto-kjetil.ch / Swiss Karate Federation.', 'Photos : Kjetil Waber, foto-kjetil.ch / Swiss Karate Federation.'],
    'Sisseln AG · Jahrgang 2003 · Kaufmann EFZ in Ausbildung': ['Sisseln AG · born 2003 · commercial apprentice (KV)', 'Sisseln AG · né en 2003 · apprenti employé de commerce'],
    'Eric Timmer im Dress der Swiss Karate Federation': ['Eric Timmer in the Swiss Karate Federation team jacket', 'Eric Timmer dans la veste de la Swiss Karate Federation'],
    'Foto: <a href="https://foto-kjetil.ch" target="_blank" rel="noopener">Kjetil Waber</a>': ['Photo: <a href="https://foto-kjetil.ch" target="_blank" rel="noopener">Kjetil Waber</a>', 'Photo : <a href="https://foto-kjetil.ch" target="_blank" rel="noopener">Kjetil Waber</a>']
  };
  var UI = {
    statement: {
      de: 'Mit sechs Jahren stand ich zum ersten Mal auf der Matte. Heute kämpfe ich für die *Schweiz* gegen die Besten der Welt. Neben meiner KV-Lehre, mit rund zehn Trainings pro Woche. Mein Ziel ist klar: *Europa-* und *Weltmeister* werden.',
      en: 'I first stepped onto the mat at the age of six. Today I fight for *Switzerland* against the best in the world. Alongside my commercial apprenticeship, with around ten training sessions a week. My goal is clear: to become *European* and *World* *Champion.*',
      fr: 'À six ans, je suis monté pour la première fois sur le tatami. Aujourd’hui, je combats pour la *Suisse* contre les meilleurs du monde. En parallèle de mon apprentissage commercial, avec une dizaine d’entraînements par semaine. Mon objectif est clair : devenir *champion* *d’Europe* et *du* *monde.*'
    },
    foto: { de: 'Foto', en: 'Photo', fr: 'Photo' },
    formMissing: { de: 'Bitte fülle Name, eine gültige E-Mail-Adresse und deine Nachricht aus.', en: 'Please fill in your name, a valid email address and your message.', fr: 'Veuillez indiquer votre nom, une adresse e-mail valide et votre message.' },
    formFailed: { de: 'Das hat leider nicht geklappt. Schreib mir direkt an e.timmer@gmx.ch.', en: 'Sorry, that didn’t work. Please write to me directly at e.timmer@gmx.ch.', fr: 'Désolé, cela n’a pas fonctionné. Écrivez-moi directement à e.timmer@gmx.ch.' },
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
    ['alt', 'aria-label', 'data-sub'].forEach(function (a) {
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
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
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
  /* Galerie direkt mit einem Turnier öffnen: galerie.html#em / #basel / #skl */
  var hashTab = { '#em': 'tab-em', '#basel': 'tab-bom', '#skl': 'tab-skl' }[location.hash];
  if (hashTab && document.getElementById(hashTab)) document.getElementById(hashTab).click();

  /* Foto-Lightbox */
  var lb = document.getElementById('lb'), lbimg = document.getElementById('lbimg'), lbcap = document.getElementById('lbcap'), lbcount = document.getElementById('lbcount');
  var cur = 0, lastFocus = null;
  function show(i) {
    cur = (i + thumbs.length) % thumbs.length;
    var t = thumbs[cur].querySelector('img');
    lbimg.src = t.getAttribute('src').replace('-sm.jpg', '.jpg');
    lbimg.alt = t.alt;
    lbcap.textContent = t.alt + ' · ' + T('foto') + ': Kjetil Waber';
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
  var jsel = document.getElementById('jsel'), jmail = document.getElementById('jmail'), curTier = null;
  function refreshJoin() {
    if (!curTier || !jsel) return;
    var label = curTier.querySelector('.t-name').textContent + ' (' + curTier.querySelector('.t-price').textContent + ', ' + curTier.querySelector('.t-per').textContent + ')';
    jsel.textContent = label;
    jmail.setAttribute('aria-disabled', 'false');
  }
  function tierLabel() {
    return curTier ? curTier.querySelector('.t-name').textContent + ' (' + curTier.querySelector('.t-price').textContent + ', ' + curTier.querySelector('.t-per').textContent + ')' : '';
  }

  /* Kontaktfenster: Nachricht geht über FormSubmit direkt in Erics Postfach */
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
  if (jmail) jmail.addEventListener('click', function (e) {
    e.preventDefault();
    if (!curTier) return;
    openContact('Gönnerclub', T('mailBody').replace('{t}', tierLabel()));
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
    fetch('https://formsubmit.co/ajax/e.timmer@gmx.ch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        Name: name, 'E-Mail': mail, Thema: fTopic.value, Nachricht: msg, Sprache: lang.toUpperCase(),
        _replyto: mail, _subject: 'Webseite: ' + fTopic.value + ' von ' + name, _template: 'table',
        _honey: document.getElementById('cf-honey').value
      })
    }).then(function (r) { return r.json(); }).then(function (d) {
      if (d && (d.success === true || d.success === 'true')) {
        cform.hidden = true; cdone.hidden = false; cform.reset();
      } else { throw new Error((d && d.message) || 'failed'); }
    }).catch(function (err) {
      var why = (err && err.message && err.message !== 'failed') ? ' (' + String(err.message).slice(0, 160) + ')' : '';
      try { console.warn('Kontaktformular:', err); } catch (e) {}
      cErr.textContent = T('formFailed') + why; cErr.hidden = false;
    }).then(function () { cSend.disabled = false; cSend.textContent = tr('Nachricht senden'); });
  });
  tiers.forEach(function (t) {
    t.addEventListener('click', function () {
      tiers.forEach(function (o) { o.setAttribute('aria-pressed', o === t ? 'true' : 'false'); });
      curTier = t;
      refreshJoin();
    });
  });

  document.querySelectorAll('.payrow .cp').forEach(function (b) {
    b.addEventListener('click', function () {
      var val = b.getAttribute('data-copy'), row = b.parentNode.querySelector('.pv');
      var ok = function () { b.textContent = T('copied'); setTimeout(function () { b.textContent = tr('Kopieren'); }, 1800); };
      var fb = function () { var rg = document.createRange(); rg.selectNodeContents(row); var s = window.getSelection(); s.removeAllRanges(); s.addRange(rg); b.textContent = T('selected'); };
      try { navigator.clipboard.writeText(val).then(ok, fb); } catch (e) { fb(); }
    });
  });

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

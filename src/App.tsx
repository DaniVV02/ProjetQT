import { useState, useEffect, useRef } from 'react';
import { Smile, Angry, Frown, Meh, Heart, Laugh, BookOpenCheck, Info } from 'lucide-react';

type StoryKey = keyof typeof stories['french'];
type Language = 'french' | 'english';

type Emotion = 'happy' | 'sad' | 'love' | 'angry' | 'excited' | 'neutral';

const buttonLabels = {
  french: {
    chooseStory: "Choisir une histoire",
    previous: "Précédent",
    play: "Lecture",
    pause: "Pause",
    next: "Suivant",
    restart: "Recommencer"
  },
  english: {
    chooseStory: "Choose a story",
    previous: "Previous",
    play: "Play",
    pause: "Pause",
    next: "Next",
    restart: "Restart"
  }
};

const stories = {
  french: {
    wolf: {
      title: "Le Loup Émotif",
      pages: [
        { text: "Il était une fois un loup qui vivait dans une belle forêt, entouré de tous ses amis. Il s'appelait Loup.", emotion: "happy" },
        { text: "Mais ce loup avait un souci : il était trop émotif. Joyeux, fâché, triste, excité… il changeait d'humeur à cent à l'heure !", emotion: "excited" },
        { text: "Ainsi, quand Loup était d'humeur joyeuse, il sifflotait, le cœur léger, faisait des blagues, parlait aux arbres… Il était plein d'énergie et débordait d'idées pour s'amuser !", emotion: "happy" },
        { text: "Cependant, si quelque chose le contrariait… Ah ! Il se renfrognait, explosait, et envoyait tout le monde balader !", emotion: "surprised" },
        { text: "— Tu dois apprendre à te calmer, Loup, lui dit un jour Maître Hibou, excédé. Tu nous donnes le tournis !", emotion: "angry" },
        { text: "— Apprendre à me calmer ? Mais pourquoi ? demanda Loup.", emotion: "ashamed" },
        { text: "— Pour être plus serein ! Mais ne t'inquiète pas, nous allons t'aider… On commence demain !", emotion: "happy" },
        { text: "Comment te sens-tu quand tu es en colère ?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "Le lendemain, Loup se rendit chez son ami.", emotion: "neutral" },
        { text: "— Pour contrôler tes émotions, le yoga, c'est parfait ! déclara Maître Hibou. Respire calmement et fais le vide en toi.", emotion: "neutral" },
        { text: "Maître Hibou enchaîna les positions : lotus, montagne… et Loup essaya de l'imiter. Ouh là là ! Ce n'était pas facile, mais qu'est-ce que c'était rigolo ! N'y tenant plus, Loup éclata de rire.", emotion: "happy" },
        { text: "— On dirait que le yoga ne fonctionne pas avec toi, soupira Maître Hibou.", emotion: "confused" },
        { text: "À l'extérieur, Alfred attendait Loup de pied ferme.", emotion: "neutral" },
        { text: "— Rien de tel que le sport pour se défouler, dit-il. Je t'ai préparé un parcours spécial 'Loup excité'. Prêt ?", emotion: "happy" },
        { text: "Et il fila comme une fusée. Derrière lui, Loup courait, sautait, rampait…", emotion: "happy" },
        { text: "Alfred s'arrêta au pied d'un arbre immense.", emotion: "neutral" },
        { text: "— On se retrouve en haut ! cria-t-il en disparaissant dans les feuillages.", emotion: "hope" },
        { text: "Arrivé au sommet, Loup regarda en bas… Sa gorge se serra, son cœur se mit à cogner dans sa poitrine, ses jambes à trembler.", emotion: "cry" },
        { text: "— Alfred, j'ai peur ! paniqua-t-il. Je vais tomber !", emotion: "cry" },
        { text: "Comment te sens-tu quand tu as peur ?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "— Calme-toi, Loup, je suis avec toi. On va redescendre ensemble, doucement.", emotion: "concerned" },
        { text: "Loup prit une grande inspiration et, tout tremblant, il redescendit.", emotion: "surprised" },
        { text: "— Tu as vaincu ta peur, tu peux être fier de toi ! le félicita Alfred.", emotion: "hope" },
        { text: "Loup sourit : ah ça oui, il était fier de lui !", emotion: "happy" },
        { text: "Tout ceci m'a mis en appétit, se dit Loup. Cela tombait bien : Gros Louis l'attendait chez lui.", emotion: "happy" },
        { text: "Les pattes pleines de farine, Gros Louis était avec Louve dans la cuisine.", emotion: "neutral" },
        { text: "— Ils ont l'air de bien s'amuser tous les deux…, pensa Loup, jaloux.", emotion: "sad" },
        { text: "— Salut Loup ! fit Gros Louis. Aujourd'hui, on prépare des macarons. Pour réussir ces gâteaux, il faut être très, très patient. Tiens, c'est un bon exercice pour toi, n'est-ce pas ?", emotion: "happy" },
        { text: "À ces mots, Louve éclata de rire.", emotion: "happy" },
        { text: "Loup sentit la moutarde lui monter au nez. Il devint tout rouge, tapa du pied et explosa :", emotion: "angry" },
        { text: "— C'est ça, moquez-vous de moi ! hurla-t-il, très en colère. Je m'en fiche ! De toute façon, je n'ai pas envie de faire des gâteaux idiots avec des idiots !", emotion: "angry" },
        { text: "Loup s'en alla, grommelant dans sa barbe et donnant des coups de patte dans les arbres.", emotion: "angry" },
        { text: "Peu à peu, Loup ralentit son allure, pour finir par se traîner comme un escargot, le cœur lourd. Une larme roula sur sa joue.", emotion: "sad" },
        { text: "— Je n'aurais pas dû m'énerver, renifla-t-il. Louve ne m'aimera plus jamais… Comme je suis triste…", emotion: "cry" },
        { text: "Comment te sens-tu quand tu es triste ?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "— Mais, qu'est-ce qui arrive à mon super copain ? fit alors une voix derrière lui.", emotion: "confused" },
        { text: "C'était Demoiselle Yéti. Elle lui fit un gros câlin, puis elle dit :", emotion: "love" },
        { text: "— Ce qui est fait est fait. Maintenant, il faut réparer ta bêtise ! Va voir Gros Louis et Louve, et excuse-toi. Tu te sentiras beaucoup mieux après.", emotion: "nice" },
        { text: "— Et si Louve ne veut pas me pardonner ? fit Loup, inquiet.", emotion: "concerned" },
        { text: "— Qui ne tente rien n'a rien, répondit Demoiselle Yéti. Allez, file !", emotion: "nice" },
        { text: "Tout honteux, Loup retourna frapper à la porte de Gros Louis.", emotion: "ashamed" },
        { text: "— Je vous demande pardon, les amis, fit-il. Je ne pensais pas ce que j'ai dit. Ce n'était pas gentil.", emotion: "sad" },
        { text: "— Excuses acceptées, sourit Louve.", emotion: "happy" },
        { text: "Loup et Louve se regardèrent, des cœurs plein les yeux. Loup leva ses pattes : il se sentait léger, léger, léger ! Et… il était affamé !", emotion: "hope" },
        { text: "À table, mes amis, les macarons sont prêts !", emotion: "happy" }
      ]
    },
    cat: {
      title: "Le Chat Craintif",
      pages: [
        { text: "Il était une fois un petit chat nommé Grizou, qui vivait dans une maison cosy, entouré de ses amis. Grizou adorait sa vie tranquille.", emotion: "happy" },
        { text: "Mais Grizou avait un grand problème : il était très craintif. Il avait peur de tout ! Des bruits, des ombres, des nuages… tout l'effrayait.", emotion: "concerned" },
        { text: "Quand Grizou entendait un bruit étrange, il se cachait sous le canapé et tremblait de peur.", emotion: "cry" },
        { text: "Comment te sens-tu quand tu as peur ?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "Un jour, Grizou aperçut une ombre passer près de la fenêtre. Il sursauta et se réfugia sous la table, le cœur battant.", emotion: "surprised" },
        { text: "— Grizou, pourquoi as-tu peur ? demanda son ami, le gentil chien Max, en s'approchant.", emotion: "question" },
        { text: "— J'ai vu une ombre, je crois que c'est un monstre ! répondit Grizou, tout tremblant.", emotion: "cry" },
        { text: "— Oh, mais ce n'est rien, c'est juste un arbre qui bouge avec le vent ! dit Max en rigolant.", emotion: "happy" },
        { text: "— Un arbre ? Vraiment ? demanda Grizou, incertain.", emotion: "question" },
        { text: "— Oui ! Et pour te montrer que tu n'as rien à craindre, viens avec moi, on va explorer !", emotion: "excited" },
        { text: "Grizou suivit Max à l'extérieur, tout en se repliant sur lui-même. Mais plus il marchait, plus il se sentait nerveux.", emotion: "shy" },
        { text: "— Regarde, Grizou, c'est juste une branche qui bouge dans le vent, expliqua Max en pointant un arbre.", emotion: "happy" },
        { text: "Grizou observa attentivement. Effectivement, ce n'était qu'une branche qui se balançait doucement. Mais il n'était toujours pas rassuré.", emotion: "neutral" },
        { text: "— Et si c'était un monstre déguisé en branche ? murmura Grizou.", emotion: "question" },
        { text: "Max sourit et dit : — Grizou, il n'y a pas de monstres. Parfois, nos peurs grandissent dans notre tête, mais elles ne sont pas réelles.", emotion: "nice" },
        { text: "Comment réagis-tu quand tu entends un bruit étrange ?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "Max proposa alors de faire une petite promenade dans la forêt pour aider Grizou à se détendre.", emotion: "hope" },
        { text: "— Si tu te sens effrayé, je serai là pour toi, dit Max en le rassurant.", emotion: "love" },
        { text: "Grizou, bien que nerveux, accepta de suivre son ami. Ils marchaient tranquillement, et à chaque bruit, Grizou se crispait, mais Max lui rappelait que tout allait bien.", emotion: "concerned" },
        { text: "Soudain, un petit cri perça l'air. Grizou sursauta et se cacha derrière un arbre.", emotion: "surprised" },
        { text: "— Ne t'inquiète pas, c'est juste un oiseau, dit Max, souriant.", emotion: "nice" },
        { text: "Grizou jeta un coup d'œil et vit effectivement un petit oiseau qui chantait joyeusement sur une branche.", emotion: "happy" },
        { text: "— Tu vois, il n'y a rien à craindre, ajouta Max.", emotion: "happy" },
        { text: "Comment te sens-tu quand tu entends un oiseau chanter ?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "Grizou, bien qu'encore nerveux, se sentit un peu plus en sécurité. Il suivit Max plus loin, ses pattes tremblant moins.", emotion: "hope" },
        { text: "— Max, merci de m'aider à surmonter mes peurs, dit Grizou, touché.", emotion: "love" },
        { text: "— C'est normal, Grizou ! Les amis sont là pour se soutenir ! répondit Max.", emotion: "nice" },
        { text: "En rentrant chez eux, Grizou se sentit plus serein. Il avait appris qu'il n'y avait pas de monstres et que parfois, nos peurs étaient juste des illusions.", emotion: "hope" },
        { text: "Le soir, Grizou s'endormit paisiblement, un sourire aux lèvres, content d'avoir affronté ses craintes.", emotion: "happy" },
        { text: "Tout est bien qui finit bien, pensa Grizou en fermant les yeux, un sentiment de paix envahissant son cœur.", emotion: "happy" },
        { text: "Et toi, de quoi as-tu peur parfois ?", emotion: "asking" },
        { text: "", emotion: "response" }
      ]
    },
    bear: {
      title: "Bouba, l'Ourson Très Mignon",
      pages: [
        { text: "Il était une fois, dans une forêt enchantée, un petit ourson nommé Bouba. Bouba était un ourson tout doux, tout mignon, avec des yeux pétillants et un sourire qui illuminait la forêt.", emotion: "excited" },
        { text: "Tous les animaux de la forêt aimaient Bouba. Il avait une façon toute particulière de sauter en rond quand il était joyeux, et tout le monde riait quand il faisait ses petites pirouettes.", emotion: "happy" },
        { text: "Mais il y avait une chose que Bouba adorait plus que tout : faire des câlins ! Il câlinait ses amis tous les jours : les oiseaux, les lapins, et même les grands arbres !", emotion: "love" },
        { text: "Un matin, Bouba se réveilla tôt et décida que cette journée serait spéciale. Il voulait offrir un câlin à chaque être vivant de la forêt.", emotion: "excited" },
        { text: "Il commença par le vieux hérisson Hector, qui dormait encore sous un tas de feuilles. Bouba s'approcha doucement et lui fit un câlin tout doux. — Hé ! Oh, merci Bouba, ronronna Hector en souriant.", emotion: "happy" },
        { text: "Ensuite, Bouba se rendit chez Léon, le lapin. Il était occupé à manger des carottes, mais quand il vit Bouba s'approcher, il sourit et ouvrit ses bras. Bouba le serra dans ses bras tout mous et tout chauds.", emotion: "shy" },
        { text: "— Merci Bouba, tu es vraiment le plus gentil des oursons ! dit Léon, tout joyeux.", emotion: "hope" },
        { text: "Bouba se rendit ensuite chez Gigi, la girafe. Elle avait un long cou, mais Bouba savait comment l'atteindre : il sauta, sauta encore, jusqu'à ce qu'il puisse lui faire un câlin tout doux.", emotion: "excited" },
        { text: "— Oh, Bouba ! dit Gigi en baissant son long cou. Quelle belle surprise !", emotion: "nice" },
        { text: "Bouba, tout content de répandre de la joie, continua sa route. Il allait donner des câlins à tout le monde : aux écureuils, aux oiseaux, aux arbres, et même aux petites fleurs qui se levaient sous les rayons du soleil.", emotion: "happy" },
        { text: "Comment te sens-tu quand tu donnes un câlin ?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "Mais après un moment, Bouba se rendit compte qu'il avait câliné tout le monde, sauf une personne très importante : sa maman.", emotion: "surprised" },
        { text: "Bouba courut alors chez sa maman, qui était en train de préparer des baies pour le goûter. Il se jeta dans ses bras et la serra fort.", emotion: "love" },
        { text: "— Maman, je t'aime tellement ! dit Bouba, tout heureux.", emotion: "love" },
        { text: "Sa maman lui sourit tendrement et lui répondit : — Je t'aime aussi, mon petit Bouba. Tu es un ourson tellement gentil et attentionné.", emotion: "love" },
        { text: "Bouba se sentit tout chaud à l'intérieur. Il comprit alors que la meilleure chose qu'il pouvait faire, c'était de partager son amour avec ceux qu'il aimait.", emotion: "hope" },
        { text: "Ce soir-là, après avoir distribué des câlins à tout le monde, Bouba s'endormit paisiblement, le cœur plein de bonheur, entouré de l'amour de sa maman.", emotion: "happy" },
        { text: "Et il se dit en fermant les yeux : — Demain, je donnerai encore plus de câlins. Parce que plus on en donne, plus le monde devient beau.", emotion: "love" },
        { text: "Et toi, à qui aimerais-tu faire un câlin aujourd’hui ?", emotion: "asking" },
        { text: "", emotion: "response" }
      ]
    },
    rabbit: {
      title: "Le Lapin Curieux",
      pages: [
        { text: "Il était une fois un petit lapin nommé Benjamin, qui vivait dans une grande prairie verte, entouré de fleurs et de ses amis.", emotion: "nice" },
        { text: "Benjamin était un lapin très curieux. Il adorait explorer, découvrir de nouveaux endroits et poser mille questions.", emotion: "excited" },
        { text: "Un matin, Benjamin aperçut un petit sentier qui serpentait à travers les arbres. Il n'avait jamais vu ce chemin auparavant et il décida de le suivre.", emotion: "excited" },
        { text: "— Où mène ce sentier ? se demanda Benjamin, tout excité à l'idée de découvrir une nouvelle aventure.", emotion: "question" },
        { text: "En s'aventurant plus loin, il rencontra une vieille tortue assise sous un arbre.", emotion: "neutral" },
        { text: "— Bonjour, tortue ! lui dit Benjamin. Que fais-tu ici ? Je n'avais jamais vu ce sentier avant.", emotion: "nice" },
        { text: "— Oh, ce sentier mène à un endroit très spécial, répondit la tortue avec un sourire. C'est un endroit où tous les secrets de la forêt se cachent.", emotion: "excited" },
        { text: "Benjamin, tout excité, décida de suivre le sentier jusqu'à cet endroit mystérieux.", emotion: "excited" },
        { text: "Le chemin était parsemé de fleurs aux couleurs éclatantes et de papillons qui virevoltaient dans l'air.", emotion: "hope" },
        { text: "Mais plus il avançait, plus il se sentait un peu nerveux. L'endroit devenait plus sombre, et les arbres semblaient se rapprocher.", emotion: "concerned" },
        { text: "Comment te sens-tu quand tu découvres un endroit inconnu ?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "— Peut-être que je devrais faire demi-tour, pensa Benjamin, mais il était trop curieux pour revenir en arrière.", emotion: "neutral" },
        { text: "Soudain, il aperçut une petite lumière qui brillait au bout du sentier. Il se sentit rassuré et s'approcha.", emotion: "excited" },
        { text: "En arrivant à la lumière, Benjamin découvrit une clairière magnifique, remplie de lucioles scintillantes. C'était un endroit magique qu'il n'avait jamais vu auparavant.", emotion: "happy" },
        { text: "— Wow ! C'est incroyable ! s'exclama Benjamin. C'est l'endroit le plus beau que j'aie jamais vu !", emotion: "hope" },
        { text: "Il se coucha dans l'herbe douce et observa les lucioles danser autour de lui. C'était un moment de pure magie.", emotion: "hope" },
        { text: "Mais soudain, Benjamin se souvint de sa famille et de ses amis. Il avait hâte de leur raconter sa découverte.", emotion: "surprised" },
        { text: "Alors, il se leva et se dirigea vers la sortie de la clairière, en se sentant fier de sa curiosité.", emotion: "happy" },
        { text: "— Je vais leur raconter tout ce que j'ai vu ! se dit Benjamin avec enthousiasme.", emotion: "hope" },
        { text: "Quand il arriva chez lui, ses amis étaient impatients de savoir où il était allé.", emotion: "excited" },
        { text: "— Benjamin, où étais-tu ? s'exclamèrent-ils. On t'a cherché partout !", emotion: "question" },
        { text: "— J'ai trouvé un endroit secret, répondit Benjamin en souriant. Il y a une clairière magique avec des lucioles !", emotion: "happy" },
        { text: "Ses amis étaient impressionnés et décidèrent de partir en aventure avec lui pour découvrir ce lieu merveilleux.", emotion: "excited" },
        { text: "Et ainsi, Benjamin et ses amis partirent ensemble, curieux de découvrir d'autres secrets de la forêt.", emotion: "excited" },
        { text: "Benjamin sourit en pensant que sa curiosité l'avait conduit à une belle aventure, et il se promit de ne jamais cesser de poser des questions et de découvrir le monde autour de lui.", emotion: "hope" },
        { text: "Et toi, qu’aimerais-tu découvrir dans une forêt magique ?", emotion: "asking" },
        { text: "", emotion: "response" }
      ]
    },
    raton: {
      title: "Le Raton Laveur Malicieux",
      pages: [
        { text: "Il était une fois un petit raton laveur nommé Rolo. Il vivait dans une forêt luxuriante, pleine de mystères et de secrets.", emotion: "surprised" },
        { text: "Rolo était un raton laveur très malicieux. Il adorait faire des farces à ses amis. Si quelqu'un n'était pas attentif, Rolo en profitait pour faire une blague !", emotion: "funny" },
        { text: "Un jour, il décida de jouer un tour à son ami, le cerf Timothée. Il savait que Timothée adorait manger des baies sucrées.", emotion: "excited" },
        { text: "Rolo se glissa discrètement près de la réserve de baies de Timothée et en échangea quelques-unes contre des baies épicées qu'il avait trouvées.", emotion: "funny" },
        { text: "— Timothée va adorer, pensa Rolo en se cachant derrière un buisson pour observer la scène.", emotion: "excited" },
        { text: "Lorsque Timothée arriva pour goûter ses baies, il les trouva délicieuses au début. Mais au bout de quelques bouchées, il se mit à faire une grimace.", emotion: "surprised" },
        { text: "— Ah, mais qu'est-ce que c'est que ça ? s'écria Timothée. Ces baies sont épicées !", emotion: "angry" },
        { text: "Rolo éclata de rire dans son buisson. Mais il ne s'attendait pas à ce qui allait se passer.", emotion: "happy" },
        { text: "Timothée, un peu surpris, se tourna et aperçut Rolo qui riait. — Alors comme ça, c'est toi le petit farceur !", emotion: "angry" },
        { text: "Rolo se sentit un peu coupable, mais il ne pouvait s'empêcher de rigoler. — Oh, Timothée, c'était juste pour rire !", emotion: "funny" },
        { text: "— Eh bien, c'est toi qui rigoles ! rétorqua Timothée. La prochaine fois, c'est moi qui te jouerai un tour !", emotion: "question" },
        { text: "Rolo comprit qu'il était peut-être allé un peu trop loin avec sa farce. — Désolé, Timothée. Je ne voulais pas te déranger autant.", emotion: "ashamed" },
        { text: "Timothée sourit et dit : — Ce n'est pas grave, Rolo, mais il faut que tu apprennes à ne pas trop exagérer. Les blagues sont amusantes, mais il faut savoir quand s'arrêter.", emotion: "nice" },
        { text: "Rolo acquiesça, un peu honteux, mais heureux de voir que Timothée n'était pas fâché contre lui.", emotion: "shy" },
        { text: "Comment te sens-tu quand une blague va trop loin ?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "Le lendemain, Rolo décida de faire une autre farce, mais cette fois-ci, il voulait que ce soit une bonne action.", emotion: "excited" },
        { text: "Il trouva des légumes frais dans le jardin de la chouette Câline et décida de les arranger joliment dans un panier, avec un mot : 'Pour toi, Câline, avec tout mon amour'.", emotion: "love" },
        { text: "Câline, surprise, trouva le panier et lut le message. Elle se sentit touchée par ce geste. — Oh, mais c'est adorable, merci Rolo !", emotion: "hope" },
        { text: "Rolo observa tout ça de loin, satisfait de sa farce gentille. Il avait compris qu'il pouvait être malicieux tout en faisant plaisir à ses amis.", emotion: "excited" },
        { text: "En rentrant chez lui, Rolo réfléchit à sa journée. Il était content d'avoir appris qu'il était possible d'être malicieux sans blesser les autres.", emotion: "hope" },
        { text: "Ce soir-là, il s'endormit, un sourire aux lèvres, en pensant à toutes les blagues qu'il ferait à l'avenir, mais avec plus de gentillesse.", emotion: "nice" },
        { text: "Et toi, préfères-tu les blagues ou les gentillesses surprises ?", emotion: "asking" },
        { text: "", emotion: "response" }
      ]
    },
    tiger: {
      title: "Le Tigre Timide",
      pages: [
        { text: "Il était une fois un jeune tigre nommé Téo. Il vivait dans une grande forêt au cœur de la jungle, entouré de ses amis les animaux.", emotion: "excited" },
        { text: "Téo était un tigre très timide. Bien qu'il fût fort et puissant, il avait toujours peur de parler aux autres animaux et préférait rester dans son coin.", emotion: "shy" },
        { text: "Un jour, les autres animaux de la jungle décidèrent d'organiser une grande fête pour célébrer l'arrivée du printemps. Téo était invité, mais il se sentait nerveux.", emotion: "funny" },
        { text: "Est-ce que t'aimes les fêtes ?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "— Oh non, je ne vais pas y aller, pensa Téo. Et si je faisais quelque chose de gênant ? Et si personne ne voulait me parler ?", emotion: "concerned" },
        { text: "Mais sa mère, en le voyant hésiter, lui dit : — Téo, il est important de sortir de ta coquille de temps en temps. Tu verras, tu t'amuseras !", emotion: "shy" },
        { text: "Téo prit une grande inspiration et décida finalement d'y aller. Lorsqu'il arriva à la fête, il se cacha derrière un arbre pour observer.", emotion: "ashamed" },
        { text: "Les animaux dansaient, chantaient et s'amusaient ensemble. Téo les regarda en silence, admirant leur joie, mais il ne se sentait toujours pas prêt à les rejoindre.", emotion: "ashamed" },
        { text: "Soudain, un petit oiseau arriva près de lui. — Pourquoi tu ne danses pas, Téo ? demanda-t-il avec un sourire.", emotion: "nice" },
        { text: "— Je… je suis trop timide, répondit Téo, baissant la tête.", emotion: "cry" },
        { text: "L'oiseau s'approcha et lui dit : — Tu sais, tout le monde est ici pour s'amuser. Tu n'as pas à avoir peur. Viens, danse avec nous, tu te sentiras bien !", emotion: "hope" },
        { text: "Téo hésita, mais l'oiseau était si gentil qu'il décida de tenter sa chance. Il se joignit aux autres animaux, au début très timide.", emotion: "ashamed" },
        { text: "Au bout de quelques minutes, il commença à se sentir plus à l'aise. Il fit quelques pas de danse maladroits, mais les autres animaux l'encouragèrent et lui firent des signes de soutien.", emotion: "hope" },
        { text: "— Bien joué, Téo ! s'écria un singe en riant. Tu es un super danseur !", emotion: "happy" },
        { text: "Téo rougit, mais il se sentit fier de lui. Finalement, il oublia sa timidité et se laissa emporter par la musique.", emotion: "shy" },
        { text: "— Tu vois, Téo, ce n'était pas si difficile, dit l'oiseau en s'installant à côté de lui. Parfois, il suffit de faire un petit pas pour surmonter ses peurs.", emotion: "nice" },
        { text: "Téo sourit et se rendit compte qu'il avait passé un moment merveilleux. Il avait enfin osé se mêler aux autres et s'amuser.", emotion: "hope" },
        { text: "Le soir, après la fête, Téo rentra chez lui, le cœur léger et heureux. Il avait appris que même s'il était timide, il pouvait trouver le courage d'agir.", emotion: "hope" },
        { text: "— La prochaine fois, je serai le premier à danser, pensa Téo avec un sourire. Et je serai moins timide !", emotion: "happy" },
        { text: "Et toi, comment te sens-tu quand tu fais quelque chose de nouveau malgré ta timidité ?", emotion: "asking" },
        { text: "", emotion: "response" }
      ]
    }
  },
  english: {
    wolf: {
      title: "The Emotional Wolf",
      pages: [
        { text: "Once upon a time, there was a wolf who lived in a beautiful forest, surrounded by all his friends. His name was Wolf.", emotion: "happy" },
        { text: "But this wolf had a problem: he was too emotional. Happy, angry, sad, excited... his mood changed a hundred times a minute!", emotion: "excited" },
        { text: "When Wolf was in a joyful mood, he whistled with a light heart, cracked jokes, talked to the trees... He was bursting with energy and full of fun ideas!", emotion: "happy" },
        { text: "However, if something upset him… Oh no! He would frown, explode, and send everyone away!", emotion: "surprised" },
        { text: "— You need to learn to calm down, Wolf, said Master Owl one day, exasperated. You're making us dizzy!", emotion: "angry" },
        { text: "— Learn to calm down? But why? asked Wolf.", emotion: "ashamed" },
        { text: "— To be more peaceful! But don't worry, we'll help you… We start tomorrow!", emotion: "happy" },
        { text: "How do you feel when you're angry?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "The next day, Wolf went to his friend's house.", emotion: "neutral" },
        { text: "— To control your emotions, yoga is perfect! declared Master Owl. Breathe calmly and clear your mind.", emotion: "neutral" },
        { text: "Master Owl flowed through the poses: lotus, mountain… and Wolf tried to copy him. Oh dear! It wasn't easy, but it was so funny! Unable to hold it in, Wolf burst out laughing.", emotion: "happy" },
        { text: "— Seems like yoga doesn't work for you, sighed Master Owl.", emotion: "confused" },
        { text: "Outside, Alfred was waiting impatiently for Wolf.", emotion: "neutral" },
        { text: "— Nothing beats sport to let off steam, he said. I've set up a special 'Excited Wolf' course. Ready?", emotion: "happy" },
        { text: "And off he shot like a rocket. Behind him, Wolf was running, jumping, crawling…", emotion: "happy" },
        { text: "Alfred stopped at the foot of a huge tree.", emotion: "neutral" },
        { text: "— See you at the top! he shouted as he disappeared into the leaves.", emotion: "hope" },
        { text: "At the top, Wolf looked down... His throat tightened, his heart pounded in his chest, his legs trembled.", emotion: "cry" },
        { text: "— Alfred, I'm scared! he panicked. I'm going to fall!", emotion: "cry" },
        { text: "How do you feel when you're scared?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "— Calm down, Wolf. I'm right here with you. We'll climb down together, slowly.", emotion: "concerned" },
        { text: "Wolf took a deep breath and, trembling all over, climbed down.", emotion: "surprised" },
        { text: "— You've conquered your fear—you can be proud of yourself! Alfred congratulated him.", emotion: "hope" },
        { text: "Wolf smiled: oh yes, he was truly proud of himself!", emotion: "happy" },
        { text: "All this made me hungry, thought Wolf. That's perfect—Big Louie is waiting for me.", emotion: "happy" },
        { text: "Covered in flour, Big Louie was in the kitchen with Lona.", emotion: "neutral" },
        { text: "— They look like they're having so much fun together…, thought Wolf, jealous.", emotion: "sad" },
        { text: "— Hi, Wolf! said Big Louie. Today we're making macarons. To succeed with these treats, you have to be very, very patient. It's a great exercise for you, isn't it?", emotion: "happy" },
        { text: "At these words, Lona burst out laughing.", emotion: "happy" },
        { text: "Wolf felt his temper rising. He turned red, stomped his foot and exploded:", emotion: "angry" },
        { text: "— That's right, go ahead and make fun of me! he shouted, furious. I don't care! I don't even want to make stupid cookies with stupid people!", emotion: "angry" },
        { text: "Wolf stormed off, muttering under his breath and swiping angrily at the trees.", emotion: "angry" },
        { text: "Little by little, Wolf slowed down, until he was dragging his feet like a snail, his heart heavy. A tear rolled down his cheek.", emotion: "sad" },
        { text: "— I shouldn't have gotten angry, he sniffled. Lona will never love me again... I feel so sad...", emotion: "cry" },
        { text: "How do you feel when you're sad?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "— Hey, what's wrong with my awesome buddy? came a voice behind him.", emotion: "confused" },
        { text: "It was Miss Yeti. She gave him a big hug, then said:", emotion: "love" },
        { text: "— What's done is done. Now you have to fix your mistake! Go see Big Louie and Lona and apologize. You'll feel so much better afterward.", emotion: "nice" },
        { text: "— But what if Lona doesn't forgive me? asked Wolf, worried.", emotion: "concerned" },
        { text: "— Nothing ventured, nothing gained, replied Miss Yeti. Go on now!", emotion: "nice" },
        { text: "Feeling ashamed, Wolf went back and knocked on Big Louie's door.", emotion: "ashamed" },
        { text: "— I'm sorry, my friends, he said. I didn't mean what I said. It wasn't kind.", emotion: "sad" },
        { text: "— Apology accepted, smiled Lona.", emotion: "happy" },
        { text: "Wolf and Lona looked at each other, hearts in their eyes. Wolf lifted his paws: he felt light, light, light! And... he was starving!", emotion: "hope" },
        { text: "Let's eat now —the macarons are ready!", emotion: "happy" }
      ]
    },
    cat: {
      title: "The Fearful Cat",
      pages: [
        { text: "Once upon a time, there was a little cat named Grizou, who lived in a cozy house, surrounded by his friends. Grizou loved his peaceful life.", emotion: "happy" },
        { text: "But Grizou had a big problem: he was very fearful. He was scared of everything! Noises, shadows, clouds... everything frightened him.", emotion: "concerned" },
        { text: "When Grizou heard a strange noise, he would hide under the couch and tremble with fear.", emotion: "cry" },
        { text: "How do you feel when you're scared?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "One day, Grizou saw a shadow pass near the window. He jumped and hid under the table, his heart pounding.", emotion: "surprised" },
        { text: "— Grizou, why are you scared? asked his friend, the kind dog Max, as he approached.", emotion: "question" },
        { text: "— I saw a shadow, I think it's a monster! replied Grizou, trembling.", emotion: "cry" },
        { text: "— Oh, it's nothing! It's just a tree moving in the wind! said Max, laughing.", emotion: "happy" },
        { text: "— A tree? Really? asked Grizou, uncertain.", emotion: "question" },
        { text: "— Yes! And to show you there's nothing to be afraid of, come with me—let's explore!", emotion: "excited" },
        { text: "Grizou followed Max outside, curling in on himself. But the more he walked, the more nervous he felt.", emotion: "shy" },
        { text: "— Look, Grizou, it's just a branch moving in the wind, explained Max, pointing to a tree.", emotion: "happy" },
        { text: "Grizou looked carefully. Indeed, it was just a branch swaying gently. But he still wasn’t reassured.", emotion: "neutral" },
        { text: "— What if it’s a monster disguised as a branch? whispered Grizou.", emotion: "question" },
        { text: "Max smiled and said: — Grizou, there are no monsters. Sometimes our fears grow in our minds, but they aren’t real.", emotion: "nice" },
        { text: "How do you react when you hear a strange noise?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "Max then suggested a short walk through the forest to help Grizou relax.", emotion: "hope" },
        { text: "— If you feel scared, I’ll be right here with you, said Max, reassuringly.", emotion: "love" },
        { text: "Grizou, still nervous, agreed to follow his friend. They walked quietly, and at every sound, Grizou tensed up, but Max reminded him everything was fine.", emotion: "concerned" },
        { text: "Suddenly, a little cry pierced the air. Grizou jumped and hid behind a tree.", emotion: "surprised" },
        { text: "— Don’t worry, it’s just a bird, said Max, smiling.", emotion: "nice" },
        { text: "Grizou peeked and saw a little bird singing happily on a branch.", emotion: "happy" },
        { text: "— See? There’s nothing to be afraid of, added Max.", emotion: "happy" },
        { text: "How do you feel when you hear a bird singing?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "Grizou, though still a bit nervous, felt a little safer. He followed Max further, his paws trembling less.", emotion: "hope" },
        { text: "— Max, thank you for helping me overcome my fears, said Grizou, touched.", emotion: "love" },
        { text: "— That’s what friends are for, Grizou! answered Max.", emotion: "nice" },
        { text: "When they got home, Grizou felt much calmer. He had learned there were no monsters and that sometimes, our fears were just illusions.", emotion: "hope" },
        { text: "That night, Grizou fell asleep peacefully, a smile on his face, happy to have faced his fears.", emotion: "happy" },
        { text: "All's well that ends well, thought Grizou as he closed his eyes, a feeling of peace filling his heart.", emotion: "happy" },
        { text: "And you, what are you afraid of sometimes?", emotion: "asking" },
        { text: "", emotion: "response" }
      ]
    },
    bear: {
      title: "Bouba, the Very Cute Bear",
      pages: [
        { text: "Once upon a time, in an enchanted forest, there was a little bear named Bouba. Bouba was soft and cute, with sparkling eyes and a smile that lit up the forest.", emotion: "excited" },
        { text: "All the animals in the forest loved Bouba. He had a special way of jumping in circles when he was happy, and everyone laughed at his little twirls.", emotion: "happy" },
        { text: "But there was one thing Bouba loved more than anything: giving hugs! He hugged his friends every day—birds, rabbits, and even tall trees!", emotion: "love" },
        { text: "One morning, Bouba woke up early and decided this day would be special. He wanted to give a hug to every living being in the forest.", emotion: "excited" },
        { text: "He started with old Hector the hedgehog, who was still sleeping under a pile of leaves. Bouba tiptoed over and gave him a soft hug. — Oh! Thank you, Bouba, purred Hector with a smile.", emotion: "happy" },
        { text: "Next, Bouba went to see Léon the rabbit. He was busy munching carrots, but when he saw Bouba coming, he smiled and opened his arms. Bouba wrapped him in his warm, squishy arms.", emotion: "shy" },
        { text: "— Thank you, Bouba, you're truly the kindest bear! said Léon, overjoyed.", emotion: "hope" },
        { text: "Bouba then went to Gigi the giraffe. She had a long neck, but Bouba knew how to reach her: he jumped, and jumped again, until he could give her a soft hug.", emotion: "excited" },
        { text: "— Oh, Bouba! said Gigi, lowering her long neck. What a lovely surprise!", emotion: "nice" },
        { text: "Happy to spread joy, Bouba kept going. He hugged everyone: squirrels, birds, trees, and even the little flowers waking up under the sun’s rays.", emotion: "happy" },
        { text: "How do you feel when you give someone a hug?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "But after a while, Bouba realized he had hugged everyone except one very important person: his mom.", emotion: "surprised" },
        { text: "Bouba ran home to his mom, who was preparing berries for snack time. He threw himself into her arms and hugged her tightly.", emotion: "love" },
        { text: "— Mom, I love you so much! said Bouba, full of joy.", emotion: "love" },
        { text: "His mom smiled gently and replied: — I love you too, my little Bouba. You are such a kind and caring little bear.", emotion: "love" },
        { text: "Bouba felt all warm inside. He realized that the best thing he could do was share his love with the ones he cared about.", emotion: "hope" },
        { text: "That night, after giving hugs to everyone, Bouba fell asleep peacefully, his heart full of happiness, surrounded by his mother’s love.", emotion: "happy" },
        { text: "And as he closed his eyes, he said: — Tomorrow, I’ll give even more hugs. Because the more you give, the more beautiful the world becomes.", emotion: "love" },
        { text: "And you, who would you like to give a hug to today?", emotion: "asking" },
        { text: "", emotion: "response" }
      ]
    },
    rabbit: {
      title: "The Curious Rabbit",
      pages: [
        { text: "Once upon a time, there was a little rabbit named Benjamin who lived in a big green meadow, surrounded by flowers and friends.", emotion: "nice" },
        { text: "Benjamin was a very curious rabbit. He loved to explore, discover new places, and ask a thousand questions.", emotion: "excited" },
        { text: "One morning, Benjamin spotted a small path winding through the trees. He had never seen it before and decided to follow it.", emotion: "excited" },
        { text: "— Where does this path lead? wondered Benjamin, excited at the thought of a new adventure.", emotion: "question" },
        { text: "As he ventured further, he met an old turtle sitting under a tree.", emotion: "neutral" },
        { text: "— Hello, Turtle! said Benjamin. What are you doing here? I’ve never seen this path before.", emotion: "nice" },
        { text: "— Oh, this path leads to a very special place, replied the turtle with a smile. It’s where all the forest’s secrets are hidden.", emotion: "excited" },
        { text: "Benjamin, filled with excitement, decided to follow the path to this mysterious place.", emotion: "excited" },
        { text: "The trail was lined with bright flowers and butterflies fluttering in the air.", emotion: "hope" },
        { text: "But the farther he walked, the more nervous he felt. The place was getting darker, and the trees seemed to close in.", emotion: "concerned" },
        { text: "How do you feel when you're exploring a place you've never been to before?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "— Maybe I should turn back, thought Benjamin. But he was too curious to stop now.", emotion: "neutral" },
        { text: "Suddenly, he saw a little light glowing at the end of the path. He felt comforted and walked toward it.", emotion: "excited" },
        { text: "When he reached the light, Benjamin discovered a beautiful clearing filled with glowing fireflies. It was a magical place he had never seen before.", emotion: "happy" },
        { text: "— Wow! This is amazing! exclaimed Benjamin. It’s the most beautiful place I’ve ever seen!", emotion: "hope" },
        { text: "He lay down in the soft grass and watched the fireflies dance around him. It was a moment of pure magic.", emotion: "hope" },
        { text: "But suddenly, Benjamin remembered his family and friends. He couldn’t wait to tell them about his discovery.", emotion: "surprised" },
        { text: "So he stood up and walked toward the edge of the clearing, feeling proud of his curiosity.", emotion: "happy" },
        { text: "— I’m going to tell them everything I saw! thought Benjamin with excitement.", emotion: "hope" },
        { text: "When he got home, his friends were eager to know where he had gone.", emotion: "excited" },
        { text: "— Benjamin, where were you? they asked. We looked for you everywhere!", emotion: "question" },
        { text: "— I found a secret place, replied Benjamin with a smile. There’s a magical clearing filled with fireflies!", emotion: "happy" },
        { text: "His friends were amazed and decided to go on an adventure with him to find that wonderful place.", emotion: "excited" },
        { text: "And so, Benjamin and his friends set off together, curious to discover more of the forest’s secrets.", emotion: "excited" },
        { text: "Benjamin smiled, thinking how his curiosity had led him to a beautiful adventure. And he promised himself to always keep asking questions and discovering the world around him.", emotion: "hope" },
        { text: "And you, what would you like to discover in a magical forest?", emotion: "asking" },
        { text: "", emotion: "response" }
      ]
    },
    raton: {
      title: "Rolo, the Mischievous Raccoon",
      pages: [
        { text: "Once upon a time, there was a little raccoon named Rolo. He lived in a lush forest, full of mysteries and secrets.", emotion: "surprised" },
        { text: "Rolo was a very mischievous raccoon. He loved to play tricks on his friends. If someone wasn’t paying attention, Rolo would seize the moment to pull a prank!", emotion: "funny" },
        { text: "One day, he decided to play a trick on his friend Timothy the deer. He knew Timothy loved eating sweet berries.", emotion: "excited" },
        { text: "Rolo snuck quietly over to Timothy’s berry stash and swapped some of them for spicy berries he had found.", emotion: "funny" },
        { text: "— Timothy is going to love this, thought Rolo as he hid behind a bush to watch.", emotion: "excited" },
        { text: "When Timothy came to taste his berries, he found them delicious at first. But after a few bites, he started making a face.", emotion: "surprised" },
        { text: "— Ah! What is this?! shouted Timothy. These berries are spicy!", emotion: "angry" },
        { text: "Rolo burst out laughing from behind his bush. But he wasn’t expecting what would happen next.", emotion: "happy" },
        { text: "Timothy, a little surprised, turned and saw Rolo laughing. — So it was you, little prankster!", emotion: "angry" },
        { text: "Rolo felt a little guilty, but he couldn’t stop giggling. — Oh, Timothy, it was just a joke!", emotion: "funny" },
        { text: "— Oh yeah? Well next time, I’ll be the one to prank you! replied Timothy.", emotion: "question" },
        { text: "Rolo realized he might have gone a little too far with his joke. — Sorry, Timothy. I didn’t mean to upset you that much.", emotion: "ashamed" },
        { text: "Timothy smiled and said: — It’s okay, Rolo, but you need to learn not to overdo it. Jokes are fun, but you have to know when to stop.", emotion: "nice" },
        { text: "Rolo nodded, a bit ashamed, but happy that Timothy wasn’t angry at him.", emotion: "shy" },
        { text: "How do you feel when a joke goes too far?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "The next day, Rolo decided to play another trick, but this time, he wanted it to be a kind one.", emotion: "excited" },
        { text: "He found some fresh vegetables in Miss Owl’s garden and arranged them nicely in a basket, with a note: 'For you, Miss Owl, with all my love.'", emotion: "love" },
        { text: "Miss Owl, surprised, found the basket and read the message. She was touched by the gesture. — Oh, this is adorable—thank you, Rolo!", emotion: "hope" },
        { text: "Rolo watched it all from a distance, pleased with his sweet prank. He had learned he could be mischievous while still bringing joy to his friends.", emotion: "excited" },
        { text: "On his way home, Rolo thought about his day. He was happy to learn that it’s possible to be playful without hurting anyone.", emotion: "hope" },
        { text: "That night, he fell asleep with a smile, thinking about all the pranks he’d play in the future—but with more kindness.", emotion: "nice" },
        { text: "And you, do you prefer silly jokes or surprise kindness?", emotion: "asking" },
        { text: "", emotion: "response" }
      ]
    },
    tiger: {
      title: "The Shy Tiger",
      pages: [
        { text: "Once upon a time, there was a young tiger named Teo. He lived in a big forest deep in the jungle, surrounded by his animal friends.", emotion: "excited" },
        { text: "Teo was a very shy tiger. Even though he was strong and powerful, he was always afraid to talk to the other animals and preferred to stay by himself.", emotion: "shy" },
        { text: "One day, the animals of the jungle decided to throw a big party to celebrate the arrival of spring. Teo was invited, but he felt nervous.", emotion: "funny" },
        { text: "Do you like parties?", emotion: "asking" },
        { text: "", emotion: "response" },
        { text: "— Oh no, I’m not going, thought Teo. What if I do something embarrassing? What if no one wants to talk to me?", emotion: "concerned" },
        { text: "But his mom, seeing him hesitate, said: — Teo, it's important to come out of your shell sometimes. You’ll see, you’ll have fun!", emotion: "shy" },
        { text: "Teo took a deep breath and finally decided to go. When he arrived at the party, he hid behind a tree to watch.", emotion: "ashamed" },
        { text: "The animals were dancing, singing, and having fun together. Teo watched them quietly, admiring their joy, but still didn’t feel ready to join.", emotion: "ashamed" },
        { text: "Suddenly, a little bird came over. — Why aren’t you dancing, Teo? he asked with a smile.", emotion: "nice" },
        { text: "— I… I’m too shy, Teo replied, lowering his head.", emotion: "cry" },
        { text: "The bird moved closer and said: — You know, everyone is here to have fun. There’s nothing to be afraid of. Come dance with us—you’ll feel better!", emotion: "hope" },
        { text: "Teo hesitated, but the bird was so kind that he decided to give it a try. He joined the other animals, still very shy at first.", emotion: "ashamed" },
        { text: "After a few minutes, he started to feel more comfortable. He took a few clumsy dance steps, but the other animals cheered him on and gave him encouraging smiles.", emotion: "hope" },
        { text: "— Well done, Teo! shouted a monkey, laughing. You’re a great dancer!", emotion: "happy" },
        { text: "Teo blushed, but he felt proud of himself. In the end, he forgot about his shyness and let the music carry him away.", emotion: "shy" },
        { text: "— See, Teo? It wasn’t so hard, said the bird as he sat beside him. Sometimes all it takes is one small step to overcome your fears.", emotion: "nice" },
        { text: "Teo smiled and realized he had had a wonderful time. He had finally dared to join in and have fun.", emotion: "hope" },
        { text: "That evening, after the party, Teo went home with a light and happy heart. He had learned that even though he was shy, he could still find the courage to act.", emotion: "hope" },
        { text: "— Next time, I’ll be the first to dance, thought Teo with a smile. And I’ll be less shy!", emotion: "happy" },
        { text: "And you, how do you feel when you try something new even if you’re shy?", emotion: "asking" },
        { text: "", emotion: "response" }
      ]
    }    
  }
};

// About text content in both languages
const aboutContent = {
  french: {
    title: "Comment ça marche ?",
    description1: "Bienvenue sur ce site ! Ici, tu peux choisir une histoire en cliquant sur « Choisir une histoire ». Chaque histoire est lue par ton ami QT le robot.",
    description2: "QT change d’expression selon ce qui se passe. Tu peux aussi lui répondre avec des petits emojis. Amuse-toi bien !"
  },
  english: {
    title: "How does it work?",
    description1: "Welcome to this site! Here, you can pick a story by clicking on 'Choose a story'. Each story is told by your robot friend QT.",
    description2: "QT changes his face depending on the story. You can also answer with little emojis. Have fun!"
  }
};



function App() {
  const [isWelcome, setIsWelcome] = useState(true);
  const [currentStory, setCurrentStory] = useState<StoryKey>('wolf');
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showStorySelector, setShowStorySelector] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [language, setLanguage] = useState<Language>('french');
  const [showAbout, setShowAbout] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [hasStoryStarted, setHasStoryStarted] = useState(false);
  const [showAboutHint, setShowAboutHint] = useState(true);



  useEffect(() => {
    if (utteranceRef.current) {
      window.speechSynthesis.cancel(); // Annule toujours la lecture précédente
    }

    if (isPlaying && !waitingForResponse) {
      const text = stories[language][currentStory].pages[currentPage].text;
      utteranceRef.current = new SpeechSynthesisUtterance(text);
      utteranceRef.current.lang = language === 'french' ? 'fr-FR' : 'en-US';
      utteranceRef.current.onend = () => {
        setCurrentPage((prev) => {
          const nextPage = prev + 1;
          if (nextPage < stories[language][currentStory].pages.length) {
            if (stories[language][currentStory].pages[nextPage].emotion === 'asking') {
              setWaitingForResponse(true);
              setIsPlaying(false);
            }
            return nextPage;
          }
          setIsPlaying(false);
          return prev;
        });
      };
      window.speechSynthesis.speak(utteranceRef.current);
    }
  }, [isPlaying, currentStory, currentPage, waitingForResponse, language]);

  const getEmotionIcon = (emotion: string) => {
    const imageMap: Record<string, string> = {
      happy: '/emotions/happy.png',
      sad: '/emotions/sad.png',
      asking: '/emotions/question.png',
      neutral: '/emotions/neutral.png',
      surprised: '/emotions/surprised.png',
      excited: '/emotions/excited.png',
      love: '/emotions/love.png',
      shy: '/emotions/shy.png',
      angry: '/emotions/angry.png',
      question: '/emotions/confus.png',
      ashamed: '/emotions/ashamed.png',
      cry: '/emotions/cry.png',
      hope: '/emotions/hope.png',
      confused: '/emotions/confus.png',
      nice: '/emotions/nice.png',
      concerned: '/emotions/concerned.png',
      funny: '/emotions/funny.png'
    };

    const imageSrc = imageMap[emotion] || '/emotions/default.png';

    return <img src={imageSrc} alt={emotion} className="w-44 h-44 object-contain z-0" />;
  };

  const handleReset = () => {
    setCurrentPage(0);
    setIsPlaying(false);
    setWaitingForResponse(false);
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }
  };

  const handleStorySelect = (storyKey: StoryKey) => {
    setCurrentStory(storyKey);
    setCurrentPage(0);
    setIsPlaying(false);
    setShowStorySelector(false);
    setWaitingForResponse(false);
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }
  };

  const handleLanguageChange = (lang: 'french' | 'english') => {
    setLanguage(lang);
    setCurrentPage(0);
    setIsPlaying(false);
    setWaitingForResponse(false);
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }
  };

  const handleEmojiClick = (emotion: Emotion) => {
    const responseTexts: Record<Emotion, string> = language === 'french' ? {
      happy: "Je suis content que tu te sentes heureux!",
      sad: "Ne sois pas triste, calme-toi, je suis là pour toi!",
      angry: "Je comprends ! C'est important de savoir contrôler ses émotions toutefois...",
      love: "Moi aussi ! J'adore !",
      excited: "Super ! J'adore ton enthousiasme!",
      neutral: "D'accord, je comprends.",
    } : {
      happy: "I'm glad you're happy!",
      sad: "Don't be sad, take it easy, I'm here for you!",
      angry: "Calm down, it's important to know how to control your emotions however...",
      love: "Me too! I love it!",
      excited: "Super! I love your enthusiasm!",
      neutral: "OK, I understand.",
    };

    const responseText = responseTexts[emotion];
    const updatedStory = { ...stories[language][currentStory] };
    updatedStory.pages[currentPage + 1].text = responseText;
    updatedStory.pages[currentPage + 1].emotion = emotion;

    stories[language][currentStory] = updatedStory;

    setWaitingForResponse(false);
    setCurrentPage((prev) => prev + 1);
    setIsPlaying(true);
  };

  const handleNextPage = () => {
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }

    const nextPage = currentPage + 1;
    const nextEmotion = stories[language][currentStory].pages[nextPage]?.emotion;

    if (nextEmotion === 'asking') {
      setCurrentPage(nextPage);
      setIsPlaying(false);
      setWaitingForResponse(true);
    } else {
      setCurrentPage((prev) => Math.min(prev + 1, stories[language][currentStory].pages.length - 1));
      setIsPlaying(true);
    }
  };

  const handlePreviousPage = () => {
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }

    let targetPage = currentPage - 2;

    while (targetPage >= 0 && stories[language][currentStory].pages[targetPage].emotion === 'asking') {
      targetPage--;
    }

    if (targetPage >= 0) {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
      setIsPlaying(true);
    }
  };

  const storyMessages: Record<string, string> = language === 'french' ?{
    wolf: "Cette histoire va te plaire, tu vas adorer les loups !",
    cat: "Un chat très spécial t'attend, tu vas l’adorer !",
    bear: "Bouba est trop mignon ! Tu vas fondre !",
    rabbit: "Ce lapin est un vrai curieux, comme toi peut-être ?",
    raton: "Une histoire malicieuse et amusante à découvrir !",
    tiger: "Un tigre un peu timide, mais très attachant !",
    } : {
    wolf: "This story is going to please you, you will love wolves!",
    cat: "A very special cat is waiting for you, you will love it!",
    bear: "Bouba is too cute! You will melt!",
    rabbit: "This rabbit is a real curious one, just like you maybe?",
    raton: "A mischievous and fun story to discover!",
    tiger: "A slightly shy tiger, but very endearing!",
    };

    const speak = (text: string) => {
      const synth = window.speechSynthesis;
      synth.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'french' ? 'fr-FR' : 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1.2;
      utterance.voice = synth.getVoices().find(v =>
        language === 'french' ? v.lang.startsWith('fr') : v.lang.startsWith('en')
      ) || null;
      synth.speak(utterance);
    };
    
  

  if (isWelcome) {
    const welcomeText = {
      french: {
      title: "Bienvenue !",
      message:
        "Bonjour petit explorateur ! Je suis QT, ton ami robot. Ensemble, on va vivre de belles aventures. Es-tu prêt à écouter une histoire ?",
      button: "Oui ! Je suis prêt !",
      },
      english: {
      title: "Welcome!",
      message:
        "Hello little explorer! I'm QT, your robot friend. Together, we’ll go on amazing adventures. Are you ready for a story?",
      button: "Yes ! I'm ready!",
      },
    };
    
    const { title, message, button } = welcomeText[language];

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl text-center">
      <div className="flex justify-end mb-4">
        <select
          value={language}
          onChange={(e) =>
            handleLanguageChange(e.target.value as 'french' | 'english')
          }
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
        >
          <option value="french">Français</option>
          <option value="english">English</option>
        </select>
      </div>

        <h1 className="text-3xl font-bold text-purple-600 mb-6">{title}</h1>
        <img
                    src={`/emotions/qt.png`}
                    alt={title}
                    className="w-60 h-60 rounded-lg object-cover mx-auto my-4"
                    />
        <p className="text-lg text-gray-700 mb-6">{message}</p>
        <button
        onClick={() => {
          setIsWelcome(false);
          setShowStorySelector(true); 
          setIsPlaying(false); 
          setShowAboutHint(true)
        }}
        className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 text-lg"
        >
        {button}
        </button>
      </div>
      </div>
    );
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4 md:p-8 flex justify-center items-center">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="relative flex items-center justify-center w-12 h-12">
                <button
                  onClick={() => {
                    setShowAbout(!showAbout);
                    setShowAboutHint(false); 
                  }}
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                  aria-label="Afficher les informations"
                >
                  <Info className="w-8 h-8" />
                </button>

                {showAboutHint && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-blue-200 text-white-800 px-3 py-2 rounded-xl shadow-lg w-56 z-30 text-sm font-medium text-center">
                  <img
                    src={`/emotions/qt.png`}
                    alt="QT robot"
                    className="w-14 h-14 rounded-full object-cover mx-auto mb-1"
                  />
                  {language === 'french'
                        ? "Clique ici pour savoir comment utiliser le site !"
                        : "Click here to learn how to use the site!"
                      }                  
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-blue-200" />
                </div>
              )}

              </div>

                <div className="flex items-center gap-4">
                {currentStory && !showStorySelector &&(
                  <img
                    src={`/portraitsHistoires/${currentStory}.png`}
                    alt={stories[language][currentStory].title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <h1 className="text-2xl md:text-3xl font-bold text-center text-purple-600">
                  {showStorySelector
                    ? language === 'french'
                      ? "Choisissez une histoire..."
                      : "Choose a story..."
                    : currentStory
                      ? stories[language][currentStory].title
                      : "QT Robot Storyteller"}
                </h1>
              </div>

              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              {hasStoryStarted || !showStorySelector ? (
              <button
                onClick={() => {
                  const newState = !showStorySelector;
                  setShowStorySelector(newState);

                  if (newState) {
                    setIsPlaying(false);
                    window.speechSynthesis.cancel();
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 w-full md:w-auto"
              >
                <BookOpenCheck className="w-5 h-5" />
                {showStorySelector
                  ? language === 'french'
                    ? "Revenir à l'histoire"
                    : "Go Back to story"
                  : buttonLabels[language].chooseStory}
              </button>
            ) : null}


                <select
                  value={language}
                  onChange={(e) =>
                    handleLanguageChange(e.target.value as 'french' | 'english')
                  }
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg w-full md:w-auto mt-4 md:mt-0"
                >
                  <option value="french">Français</option>
                  <option value="english">English</option>
                </select>
              </div>
            </div>
    
            {/* SECTION DE SÉLECTION D’HISTOIRES */}
            {showStorySelector ? (
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(stories[language]).map(([key, story]) => (
                  <div
                    key={key}
                    className="relative group flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-50 hover:bg-purple-50 rounded-lg"
                    onMouseEnter={() => speak(storyMessages[key])}
                    onMouseLeave={() => {
                      if (utteranceRef.current) {
                        window.speechSynthesis.cancel();
                      }
                    }}

                  >
                    <img
                      src={`/portraitsHistoires/${key}.png`}
                      alt={story.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex flex-col flex-1">
                      <h3 className="font-semibold text-lg text-purple-700">
                        {story.title}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-2 mt-4 md:mt-0">
                      <button
                        onClick={() => {
                          handleLanguageChange('french');
                          handleStorySelect(key as StoryKey);
                          setHasStoryStarted(true);
                        }}
                        className="text-sm px-2 py-1 bg-purple-300 text-white rounded"
                      >
                        🇫🇷 Français
                      </button>
                      <button
                        onClick={() => {
                          handleLanguageChange('english');
                          handleStorySelect(key as StoryKey);
                          setHasStoryStarted(true);
                        }}
                        className="text-sm px-2 py-1 bg-blue-300 text-white rounded"
                      >
                        🇬🇧 English
                      </button>
                    </div>

                    {/* Nuage de texte visible au survol */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                      <div className="relative bg-white text-sm text-gray-800 rounded-2xl shadow-xl px-4 py-3 border border-purple-200 w-48 text-center">
                        <img
                          src={`/emotions/qt.png`}
                          alt="QT robot"
                          className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
                        />
                        <p className="text-sm text-gray-700 leading-snug">{storyMessages[key]}</p>
                        {/* Flèche */}
                        <div className="absolute left-[-8px] top-6 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white" />
                      </div>
                    </div>

                  </div>
                ))}

              </div>
            ) : (
              <>
                {/* QT + émotion */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative w-48 h-48 md:w-60 md:h-60 mb-6">
                    <img
                      src="/emotions/teteQT.png"
                      alt="cadre"
                      className="absolute inset-0 w-full h-full object-contain z-10"
                    />
                    <div className="absolute inset-0 flex items-center justify-center mt-6">
                      {getEmotionIcon(
                        stories[language][currentStory].pages[currentPage].emotion
                      )}
                    </div>
                  </div>
                  <div className="text-lg md:text-xl text-center font-medium text-gray-700 min-h-[4rem]">
                    {stories[language][currentStory].pages[currentPage].text}
                  </div>
                </div>
    
                {/* EMOJIS */}
                {waitingForResponse && (
                  <div className="flex justify-center gap-4 mb-8 flex-wrap">
                    <button
                      onClick={() => handleEmojiClick('happy')}
                      className="p-4 rounded-full bg-yellow-200"
                    >
                      <Smile className="w-8 h-8" />
                    </button>
                    <button
                      onClick={() => handleEmojiClick('sad')}
                      className="p-4 rounded-full bg-blue-200"
                    >
                      <Frown className="w-8 h-8" />
                    </button>
                    <button
                      onClick={() => handleEmojiClick('love')}
                      className="p-4 rounded-full bg-red-200"
                    >
                      <Heart className="w-8 h-8" />
                    </button>
                    <button
                      onClick={() => handleEmojiClick('angry')}
                      className="p-4 rounded-full bg-orange-200"
                    >
                      <Angry className="w-8 h-8" />
                    </button>
                    <button
                      onClick={() => handleEmojiClick('excited')}
                      className="p-4 rounded-full bg-green-200"
                    >
                      <Laugh className="w-8 h-8" />
                    </button>
                    <button
                      onClick={() => handleEmojiClick('neutral')}
                      className="p-4 rounded-full bg-gray-200"
                    >
                      <Meh className="w-8 h-8" />
                    </button>
                  </div>
                )}
    
                {/* NAVIGATION */}
                <div className="flex flex-col md:flex-row justify-center gap-4">
                  <button
                    onClick={handlePreviousPage}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 w-full md:w-auto"
                    disabled={currentPage === 0}
                  >
                    {buttonLabels[language].previous}
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full md:w-auto"
                  >
                    {isPlaying
                      ? buttonLabels[language].pause
                      : buttonLabels[language].play}
                  </button>
                  <button
                    onClick={handleNextPage}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 w-full md:w-auto"
                    disabled={
                      currentPage ===
                        stories[language][currentStory].pages.length - 1 ||
                      waitingForResponse
                    }
                  >
                    {buttonLabels[language].next}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 w-full md:w-auto"
                  >
                    {buttonLabels[language].restart}
                  </button>
                </div>
              </>
            )}
            {/* À PROPOS */}
            {showAbout && (
                <div className="mt-8 border-t pt-8 flex flex-col md:flex-row items-start gap-8">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-4 text-purple-600">
                      {aboutContent[language].title}
                    </h2>
                    <p className="text-gray-700 mb-4">
                      {aboutContent[language].description1}
                    </p>
                    <p className="text-gray-700">{aboutContent[language].description2}</p>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-center">
                    <img
                      src="/emotions/qt_line_up.png"
                      alt="QT robot"
                      className="w-61 h-61 object-contain"
                    />
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
    
}

export default App;

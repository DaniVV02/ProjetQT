import { useState, useEffect, useRef } from 'react';
import { Smile, Frown, Meh, Heart, BookOpen, BookOpenCheck } from 'lucide-react';

// Define the type for story keys
type StoryKey = keyof typeof stories;

// Define the type for emotions
type Emotion = 'happy' | 'sad' | 'love';

// Multiple stories with emotion markers
const stories = {
  french: {
    title: "Le Loup Émotif",
    pages: [
      { text: "Il était une fois un loup qui vivait dans une belle forêt, entouré de tous ses amis. Il s'appelait Loup.", emotion: "happy" },
      { text: "Mais ce loup avait un souci : il était trop émotif. Joyeux, fâché, triste, excité… il changeait d'humeur à cent à l'heure !", emotion: "excited" },
      { text: "Ainsi, quand Loup était d'humeur joyeuse, il sifflotait, le cœur léger, faisait des blagues, parlait aux arbres… Il était plein d'énergie et débordait d'idées pour s'amuser !", emotion: "happy" },
      { text: "Cependant, si quelque chose le contrariait… Ah ! Il se renfrognait, explosait, et envoyait tout le monde balader !", emotion: "sad" },
      { text: "— Tu dois apprendre à te calmer, Loup, lui dit un jour Maître Hibou, excédé. Tu nous donnes le tournis !", emotion: "sad" },
      { text: "— Apprendre à me calmer ? Mais pourquoi ? demanda Loup.", emotion: "neutral" },
      { text: "— Pour être plus serein ! Mais ne t'inquiète pas, nous allons t'aider… On commence demain !", emotion: "happy" },
      { text: "Comment te sens-tu quand tu es en colère ?", emotion: "asking" },
      { text: "", emotion: "response" },
      { text: "Le lendemain, Loup se rendit chez son ami.", emotion: "neutral" },
      { text: "— Pour contrôler tes émotions, le yoga, c'est parfait ! déclara Maître Hibou. Respire calmement et fais le vide en toi.", emotion: "happy" },
      { text: "Maître Hibou enchaîna les positions : lotus, montagne… et Loup essaya de l'imiter. Ouh là là ! Ce n'était pas facile, mais qu'est-ce que c'était rigolo ! N'y tenant plus, Loup éclata de rire.", emotion: "happy" },
      { text: "— On dirait que le yoga ne fonctionne pas avec toi, soupira Maître Hibou.", emotion: "sad" },
      { text: "À l'extérieur, Alfred attendait Loup de pied ferme.", emotion: "neutral" },
      { text: "— Rien de tel que le sport pour se défouler, dit-il. Je t'ai préparé un parcours spécial 'Loup excité'. Prêt ?", emotion: "happy" },
      { text: "Et il fila comme une fusée. Derrière lui, Loup courait, sautait, rampait…", emotion: "happy" },
      { text: "Alfred s'arrêta au pied d'un arbre immense.", emotion: "neutral" },
      { text: "— On se retrouve en haut ! cria-t-il en disparaissant dans les feuillages.", emotion: "excited" },
      { text: "Arrivé au sommet, Loup regarda en bas… Sa gorge se serra, son cœur se mit à cogner dans sa poitrine, ses jambes à trembler.", emotion: "sad" },
      { text: "— Alfred, j'ai peur ! paniqua-t-il. Je vais tomber !", emotion: "sad" },
      { text: "Comment te sens-tu quand tu as peur ?", emotion: "asking" },
      { text: "", emotion: "response" },
      { text: "— Calme-toi, Loup, je suis avec toi. On va redescendre ensemble, doucement.", emotion: "neutral" },
      { text: "Loup prit une grande inspiration et, tout tremblant, il redescendit.", emotion: "neutral" },
      { text: "— Tu as vaincu ta peur, tu peux être fier de toi ! le félicita Alfred.", emotion: "happy" },
      { text: "Loup sourit : ah ça oui, il était fier de lui !", emotion: "happy" },
      { text: "Tout ceci m'a mis en appétit, se dit Loup. Cela tombait bien : Gros Louis l'attendait chez lui.", emotion: "happy" },
      { text: "Les pattes pleines de farine, Gros Louis était avec Louve dans la cuisine.", emotion: "neutral" },
      { text: "— Ils ont l'air de bien s'amuser tous les deux…, pensa Loup, jaloux.", emotion: "sad" },
      { text: "— Salut Loup ! fit Gros Louis. Aujourd'hui, on prépare des macarons. Pour réussir ces gâteaux, il faut être très, très patient. Tiens, c'est un bon exercice pour toi, n'est-ce pas ?", emotion: "happy" },
      { text: "À ces mots, Louve éclata de rire.", emotion: "happy" },
      { text: "Loup sentit la moutarde lui monter au nez. Il devint tout rouge, tapa du pied et explosa :", emotion: "sad" },
      { text: "— C'est ça, moquez-vous de moi ! hurla-t-il, très en colère. Je m'en fiche ! De toute façon, je n'ai pas envie de faire des gâteaux idiots avec des idiots !", emotion: "sad" },
      { text: "Loup s'en alla, grommelant dans sa barbe et donnant des coups de patte dans les arbres.", emotion: "sad" },
      { text: "Peu à peu, Loup ralentit son allure, pour finir par se traîner comme un escargot, le cœur lourd. Une larme roula sur sa joue.", emotion: "sad" },
      { text: "— Je n'aurais pas dû m'énerver, renifla-t-il. Louve ne m'aimera plus jamais… Comme je suis triste…", emotion: "sad" },
      { text: "Comment te sens-tu quand tu es triste ?", emotion: "asking" },
      { text: "", emotion: "response" },
      { text: "— Mais, qu'est-ce qui arrive à mon super copain ? fit alors une voix derrière lui.", emotion: "neutral" },
      { text: "C'était Demoiselle Yéti. Elle lui fit un gros câlin, puis elle dit :", emotion: "love" },
      { text: "— Ce qui est fait est fait. Maintenant, il faut réparer ta bêtise ! Va voir Gros Louis et Louve, et excuse-toi. Tu te sentiras beaucoup mieux après.", emotion: "happy" },
      { text: "— Et si Louve ne veut pas me pardonner ? fit Loup, inquiet.", emotion: "sad" },
      { text: "— Qui ne tente rien n'a rien, répondit Demoiselle Yéti. Allez, file !", emotion: "happy" },
      { text: "Tout honteux, Loup retourna frapper à la porte de Gros Louis.", emotion: "sad" },
      { text: "— Je vous demande pardon, les amis, fit-il. Je ne pensais pas ce que j'ai dit. Ce n'était pas gentil.", emotion: "sad" },
      { text: "— Excuses acceptées, sourit Louve.", emotion: "happy" },
      { text: "Loup et Louve se regardèrent, des cœurs plein les yeux. Loup leva ses pattes : il se sentait léger, léger, léger ! Et… il était affamé !", emotion: "love" },
      { text: "À table, mes amis, les macarons sont prêts !", emotion: "happy" }
    ]
  },
  cat: {
    title: "Le Chat Craintif",
    pages: [
      { text: "Il était une fois un petit chat nommé Grizou, qui vivait dans une maison cosy, entouré de ses amis. Grizou adorait sa vie tranquille.", emotion: "happy" },
      { text: "Mais Grizou avait un grand problème : il était très craintif. Il avait peur de tout ! Des bruits, des ombres, des nuages… tout l'effrayait.", emotion: "fear" },
      { text: "Quand Grizou entendait un bruit étrange, il se cachait sous le canapé et tremblait de peur.", emotion: "fear" },
      { text: "Un jour, Grizou aperçut une ombre passer près de la fenêtre. Il sursauta et se réfugia sous la table, le cœur battant.", emotion: "fear" },
      { text: "— Grizou, pourquoi as-tu peur ? demanda son ami, le gentil chien Max, en s'approchant.", emotion: "neutral" },
      { text: "— J'ai vu une ombre, je crois que c'est un monstre ! répondit Grizou, tout tremblant.", emotion: "fear" },
      { text: "— Oh, mais ce n'est rien, c'est juste un arbre qui bouge avec le vent ! dit Max en rigolant.", emotion: "happy" },
      { text: "— Un arbre ? Vraiment ? demanda Grizou, incertain.", emotion: "neutral" },
      { text: "— Oui ! Et pour te montrer que tu n'as rien à craindre, viens avec moi, on va explorer !", emotion: "excited" },
      { text: "Grizou suivit Max à l'extérieur, tout en se repliant sur lui-même. Mais plus il marchait, plus il se sentait nerveux.", emotion: "fear" },
      { text: "— Regarde, Grizou, c'est juste une branche qui bouge dans le vent, expliqua Max en pointant un arbre.", emotion: "happy" },
      { text: "Grizou observa attentivement. Effectivement, ce n'était qu'une branche qui se balançait doucement. Mais il n'était toujours pas rassuré.", emotion: "neutral" },
      { text: "— Et si c'était un monstre déguisé en branche ? murmura Grizou.", emotion: "fear" },
      { text: "Max sourit et dit : — Grizou, il n'y a pas de monstres. Parfois, nos peurs grandissent dans notre tête, mais elles ne sont pas réelles.", emotion: "happy" },
      { text: "Max proposa alors de faire une petite promenade dans la forêt pour aider Grizou à se détendre.", emotion: "happy" },
      { text: "— Si tu te sens effrayé, je serai là pour toi, dit Max en le rassurant.", emotion: "love" },
      { text: "Grizou, bien que nerveux, accepta de suivre son ami. Ils marchaient tranquillement, et à chaque bruit, Grizou se crispait, mais Max lui rappelait que tout allait bien.", emotion: "neutral" },
      { text: "Soudain, un petit cri perça l'air. Grizou sursauta et se cacha derrière un arbre.", emotion: "fear" },
      { text: "— Ne t'inquiète pas, c'est juste un oiseau, dit Max, souriant.", emotion: "happy" },
      { text: "Grizou jeta un coup d'œil et vit effectivement un petit oiseau qui chantait joyeusement sur une branche.", emotion: "happy" },
      { text: "— Tu vois, il n'y a rien à craindre, ajouta Max.", emotion: "happy" },
      { text: "Grizou, bien qu'encore nerveux, se sentit un peu plus en sécurité. Il suivit Max plus loin, ses pattes moins tremblantes.", emotion: "neutral" },
      { text: "— Max, merci de m'aider à surmonter mes peurs, dit Grizou, touché.", emotion: "love" },
      { text: "— C'est normal, Grizou ! Les amis sont là pour se soutenir ! répondit Max.", emotion: "happy" },
      { text: "En rentrant chez eux, Grizou se sentit plus serein. Il avait appris qu'il n'y avait pas de monstres et que parfois, nos peurs étaient juste des illusions.", emotion: "happy" },
      { text: "Le soir, Grizou s'endormit paisiblement, un sourire aux lèvres, content d'avoir affronté ses craintes.", emotion: "happy" },
      { text: "Tout est bien qui finit bien, pensa Grizou en fermant les yeux, un sentiment de paix envahissant son cœur.", emotion: "happy" }
    ]
  },
  bear: {
    title: "Bouba, l'Ourson Très Mignon",
    pages: [
      { text: "Il était une fois, dans une forêt enchantée, un petit ourson nommé Bouba. Bouba était un ourson tout doux, tout mignon, avec des yeux pétillants et un sourire qui illuminait la forêt.", emotion: "happy" },
      { text: "Tous les animaux de la forêt aimaient Bouba. Il avait une façon toute particulière de sauter en rond quand il était joyeux, et tout le monde riait quand il faisait ses petites pirouettes.", emotion: "happy" },
      { text: "Mais il y avait une chose que Bouba adorait plus que tout : faire des câlins ! Il câlinait ses amis tous les jours : les oiseaux, les lapins, et même les grands arbres !", emotion: "loving" },
      { text: "Un matin, Bouba se réveilla tôt et décida que cette journée serait spéciale. Il voulait offrir un câlin à chaque être vivant de la forêt.", emotion: "excited" },
      { text: "Il commença par le vieux hérisson Hector, qui dormait encore sous un tas de feuilles. Bouba s'approcha doucement et lui fit un câlin tout doux. — Hé ! Oh, merci Bouba, ronronna Hector en souriant.", emotion: "happy" },
      { text: "Ensuite, Bouba se rendit chez Léon, le lapin. Il était occupé à manger des carottes, mais quand il vit Bouba s'approcher, il sourit et ouvrit ses bras. Bouba le serra dans ses bras tout mous et tout chauds.", emotion: "happy" },
      { text: "— Merci Bouba, tu es vraiment le plus gentil des oursons ! dit Léon, tout joyeux.", emotion: "happy" },
      { text: "Bouba se rendit ensuite chez Gigi, la girafe. Elle avait un long cou, mais Bouba savait comment l'atteindre : il sauta, sauta encore, jusqu'à ce qu'il puisse lui faire un câlin tout doux.", emotion: "happy" },
      { text: "— Oh, Bouba ! dit Gigi en baissant son long cou. Quelle belle surprise !", emotion: "happy" },
      { text: "Bouba, tout content de répandre de la joie, continua sa route. Il allait donner des câlins à tout le monde : aux écureuils, aux oiseaux, aux arbres, et même aux petites fleurs qui se levaient sous les rayons du soleil.", emotion: "joyful" },
      { text: "Mais après un moment, Bouba se rendit compte qu'il avait câliné tout le monde, sauf une personne très importante : sa maman.", emotion: "surprised" },
      { text: "Bouba courut alors chez sa maman, qui était en train de préparer des baies pour le goûter. Il se jeta dans ses bras et la serra fort.", emotion: "loving" },
      { text: "— Maman, je t'aime tellement ! dit Bouba, tout heureux.", emotion: "loving" },
      { text: "Sa maman lui sourit tendrement et lui répondit : — Je t'aime aussi, mon petit Bouba. Tu es un ourson tellement gentil et attentionné.", emotion: "love" },
      { text: "Bouba se sentit tout chaud à l'intérieur. Il comprit alors que la meilleure chose qu'il pouvait faire, c'était de partager son amour avec ceux qu'il aimait.", emotion: "happy" },
      { text: "Ce soir-là, après avoir distribué des câlins à tout le monde, Bouba s'endormit paisiblement, le cœur plein de bonheur, entouré de l'amour de sa maman.", emotion: "happy" },
      { text: "Et il se dit en fermant les yeux : — Demain, je donnerai encore plus de câlins. Parce que plus on en donne, plus le monde devient beau.", emotion: "love" }
    ]
  },
  rabbit: {
    title: "Le Lapin Curieux",
    pages: [
      { text: "Il était une fois un petit lapin nommé Benjamin, qui vivait dans une grande prairie verte, entouré de fleurs et de ses amis.", emotion: "happy" },
      { text: "Benjamin était un lapin très curieux. Il adorait explorer, découvrir de nouveaux endroits et poser mille questions.", emotion: "curious" },
      { text: "Un matin, Benjamin aperçut un petit sentier qui serpentait à travers les arbres. Il n'avait jamais vu ce chemin auparavant et il décida de le suivre.", emotion: "excited" },
      { text: "— Où mène ce sentier ? se demanda Benjamin, tout excité à l'idée de découvrir une nouvelle aventure.", emotion: "curious" },
      { text: "En s'aventurant plus loin, il rencontra une vieille tortue assise sous un arbre.", emotion: "neutral" },
      { text: "— Bonjour, tortue ! lui dit Benjamin. Que fais-tu ici ? Je n'avais jamais vu ce sentier avant.", emotion: "curious" },
      { text: "— Oh, ce sentier mène à un endroit très spécial, répondit la tortue avec un sourire. C'est un endroit où tous les secrets de la forêt se cachent.", emotion: "mysterious" },
      { text: "Benjamin, tout excité, décida de suivre le sentier jusqu'à cet endroit mystérieux.", emotion: "excited" },
      { text: "Le chemin était parsemé de fleurs aux couleurs éclatantes et de papillons qui virevoltaient dans l'air.", emotion: "happy" },
      { text: "Mais plus il avançait, plus il se sentait un peu nerveux. L'endroit devenait plus sombre, et les arbres semblaient se rapprocher.", emotion: "nervous" },
      { text: "— Peut-être que je devrais faire demi-tour, pensa Benjamin, mais il était trop curieux pour revenir en arrière.", emotion: "neutral" },
      { text: "Soudain, il aperçut une petite lumière qui brillait au bout du sentier. Il se sentit rassuré et s'approcha.", emotion: "happy" },
      { text: "En arrivant à la lumière, Benjamin découvrit une clairière magnifique, remplie de lucioles scintillantes. C'était un endroit magique qu'il n'avait jamais vu auparavant.", emotion: "amazed" },
      { text: "— Wow ! C'est incroyable ! s'exclama Benjamin. C'est l'endroit le plus beau que j'aie jamais vu !", emotion: "happy" },
      { text: "Il se coucha dans l'herbe douce et observa les lucioles danser autour de lui. C'était un moment de pure magie.", emotion: "peaceful" },
      { text: "Mais soudain, Benjamin se souvint de sa famille et de ses amis. Il avait hâte de leur raconter sa découverte.", emotion: "neutral" },
      { text: "Alors, il se leva et se dirigea vers la sortie de la clairière, en se sentant fier de sa curiosité.", emotion: "proud" },
      { text: "— Je vais leur raconter tout ce que j'ai vu ! se dit Benjamin avec enthousiasme.", emotion: "happy" },
      { text: "Quand il arriva chez lui, ses amis étaient impatients de savoir où il était allé.", emotion: "excited" },
      { text: "— Benjamin, où étais-tu ? s'exclamèrent-ils. On t'a cherché partout !", emotion: "concerned" },
      { text: "— J'ai trouvé un endroit secret, répondit Benjamin en souriant. Il y a une clairière magique avec des lucioles !", emotion: "happy" },
      { text: "Ses amis étaient impressionnés et décidèrent de partir en aventure avec lui pour découvrir ce lieu merveilleux.", emotion: "excited" },
      { text: "Et ainsi, Benjamin et ses amis partirent ensemble, curieux de découvrir d'autres secrets de la forêt.", emotion: "excited" },
      { text: "Benjamin sourit en pensant que sa curiosité l'avait conduit à une belle aventure, et il se promit de ne jamais cesser de poser des questions et de découvrir le monde autour de lui.", emotion: "happy" }
    ]
  },
  raton: {
    title: "Le Raton Laveur Malicieux",
    pages: [
      { text: "Il était une fois un petit raton laveur nommé Rolo. Il vivait dans une forêt luxuriante, pleine de mystères et de secrets.", emotion: "happy" },
      { text: "Rolo était un raton laveur très malicieux. Il adorait faire des farces à ses amis. Si quelqu'un n'était pas attentif, Rolo en profitait pour faire une blague !", emotion: "mischievous" },
      { text: "Un jour, il décida de jouer un tour à son ami, le cerf Timothée. Il savait que Timothée adorait manger des baies sucrées.", emotion: "mischievous" },
      { text: "Rolo se glissa discrètement près de la réserve de baies de Timothée et en échangea quelques-unes contre des baies épicées qu'il avait trouvées.", emotion: "sneaky" },
      { text: "— Timothée va adorer, pensa Rolo en se cachant derrière un buisson pour observer la scène.", emotion: "excited" },
      { text: "Lorsque Timothée arriva pour goûter ses baies, il les trouva délicieuses au début. Mais au bout de quelques bouchées, il se mit à faire une grimace.", emotion: "surprised" },
      { text: "— Ah, mais qu'est-ce que c'est que ça ? s'écria Timothée. Ces baies sont épicées !", emotion: "shocked" },
      { text: "Rolo éclata de rire dans son buisson. Mais il ne s'attendait pas à ce qui allait se passer.", emotion: "mischievous" },
      { text: "Timothée, un peu surpris, se tourna et aperçut Rolo qui riait. — Alors comme ça, c'est toi le petit farceur !", emotion: "angry" },
      { text: "Rolo se sentit un peu coupable, mais il ne pouvait s'empêcher de rigoler. — Oh, Timothée, c'était juste pour rire !", emotion: "mischievous" },
      { text: "— Eh bien, c'est toi qui rigoles ! rétorqua Timothée. La prochaine fois, c'est moi qui te jouerai un tour !", emotion: "excited" },
      { text: "Rolo comprit qu'il était peut-être allé un peu trop loin avec sa farce. — Désolé, Timothée. Je ne voulais pas te déranger autant.", emotion: "guilty" },
      { text: "Timothée sourit et dit : — Ce n'est pas grave, Rolo, mais il faut que tu apprennes à ne pas trop exagérer. Les blagues sont amusantes, mais il faut savoir quand s'arrêter.", emotion: "happy" },
      { text: "Rolo acquiesça, un peu honteux, mais heureux de voir que Timothée n'était pas fâché contre lui.", emotion: "happy" },
      { text: "Le lendemain, Rolo décida de faire une autre farce, mais cette fois-ci, il voulait que ce soit une bonne action.", emotion: "mischievous" },
      { text: "Il trouva des légumes frais dans le jardin de la chouette Câline et décida de les arranger joliment dans un panier, avec un mot : 'Pour toi, Câline, avec tout mon amour'.", emotion: "playful" },
      { text: "Câline, surprise, trouva le panier et lut le message. Elle se sentit touchée par ce geste. — Oh, mais c'est adorable, merci Rolo !", emotion: "happy" },
      { text: "Rolo observa tout ça de loin, satisfait de sa farce gentille. Il avait compris qu'il pouvait être malicieux tout en faisant plaisir à ses amis.", emotion: "proud" },
      { text: "En rentrant chez lui, Rolo réfléchit à sa journée. Il était content d'avoir appris qu'il était possible d'être malicieux sans blesser les autres.", emotion: "happy" },
      { text: "Ce soir-là, il s'endormit, un sourire aux lèvres, en pensant à toutes les blagues qu'il ferait à l'avenir, mais avec plus de gentillesse.", emotion: "happy" }
    ]
  },
  tiger: {
    title: "Le Tigre Timide",
    pages: [
      { text: "Il était une fois un jeune tigre nommé Téo. Il vivait dans une grande forêt au cœur de la jungle, entouré de ses amis les animaux.", emotion: "happy" },
      { text: "Téo était un tigre très timide. Bien qu'il fût fort et puissant, il avait toujours peur de parler aux autres animaux et préférait rester dans son coin.", emotion: "shy" },
      { text: "Un jour, les autres animaux de la jungle décidèrent d'organiser une grande fête pour célébrer l'arrivée du printemps. Téo était invité, mais il se sentait nerveux.", emotion: "nervous" },
      { text: "— Oh non, je ne vais pas y aller, pensa Téo. Et si je faisais quelque chose de gênant ? Et si personne ne voulait me parler ?", emotion: "worried" },
      { text: "Mais sa mère, en le voyant hésiter, lui dit : — Téo, il est important de sortir de ta coquille de temps en temps. Tu verras, tu t'amuseras !", emotion: "encouraging" },
      { text: "Téo prit une grande inspiration et décida finalement d'y aller. Lorsqu'il arriva à la fête, il se cacha derrière un arbre pour observer.", emotion: "shy" },
      { text: "Les animaux dansaient, chantaient et s'amusaient ensemble. Téo les regarda en silence, admirant leur joie, mais il ne se sentait toujours pas prêt à les rejoindre.", emotion: "shy" },
      { text: "Tout à coup, un petit oiseau arriva près de lui. — Pourquoi tu ne danses pas, Téo ? demanda-t-il avec un sourire.", emotion: "curious" },
      { text: "— Je… je suis trop timide, répondit Téo, baissant la tête.", emotion: "shy" },
      { text: "L'oiseau s'approcha et lui dit : — Tu sais, tout le monde est ici pour s'amuser. Tu n'as pas à avoir peur. Viens, danse avec nous, tu te sentiras bien !", emotion: "encouraging" },
      { text: "Téo hésita, mais l'oiseau était si gentil qu'il décida de tenter sa chance. Il se joignit aux autres animaux, au début très timide.", emotion: "shy" },
      { text: "Au bout de quelques minutes, il commença à se sentir plus à l'aise. Il fit quelques pas de danse maladroits, mais les autres animaux l'encouragèrent et lui firent des signes de soutien.", emotion: "happy" },
      { text: "— Bien joué, Téo ! s'écria un singe en riant. Tu es un super danseur !", emotion: "happy" },
      { text: "Téo rougit, mais il se sentit fier de lui. Finalement, il oublia sa timidité et se laissa emporter par la musique.", emotion: "happy" },
      { text: "— Tu vois, Téo, ce n'était pas si difficile, dit l'oiseau en s'installant à côté de lui. Parfois, il suffit de faire un petit pas pour surmonter ses peurs.", emotion: "happy" },
      { text: "Téo sourit et se rendit compte qu'il avait passé un moment merveilleux. Il avait enfin osé se mêler aux autres et s'amuser.", emotion: "proud" },
      { text: "Le soir, après la fête, Téo rentra chez lui, le cœur léger et heureux. Il avait appris que même s'il était timide, il pouvait trouver le courage d'agir.", emotion: "happy" },
      { text: "— La prochaine fois, je serai le premier à danser, pensa Téo avec un sourire. Et je serai moins timide !", emotion: "proud" }
    ]
  },
  english: {
    title: "The Emotional Wolf",
    pages: [
      { text: "Once upon a time, there was a wolf who lived in a beautiful forest, surrounded by all his friends. His name was Wolf.", emotion: "happy" },
      { text: "But this wolf had a problem: he was too emotional. Happy, angry, sad, excited... his mood changed a hundred times a minute!", emotion: "excited" },
      { text: "When Wolf was in a joyful mood, he whistled with a light heart, cracked jokes, talked to the trees... He was bursting with energy and full of fun ideas!", emotion: "happy" },
      { text: "However, if something upset him… Oh no! He would frown, explode, and send everyone away!", emotion: "sad" },
      { text: "— You need to learn to calm down, Wolf, said Master Owl one day, exasperated. You're making us dizzy!", emotion: "sad" },
      { text: "— Learn to calm down? But why? asked Wolf.", emotion: "neutral" },
      { text: "— To be more peaceful! But don't worry, we'll help you… We start tomorrow!", emotion: "happy" },
      { text: "How do you feel when you're angry?", emotion: "asking" },
      { text: "", emotion: "response" },
      { text: "The next day, Wolf went to his friend's house.", emotion: "neutral" },
      { text: "— To control your emotions, yoga is perfect! declared Master Owl. Breathe calmly and clear your mind.", emotion: "happy" },
      { text: "Master Owl flowed through the poses: lotus, mountain… and Wolf tried to copy him. Oh dear! It wasn't easy, but it was so funny! Unable to hold it in, Wolf burst out laughing.", emotion: "happy" },
      { text: "— Seems like yoga doesn't work for you, sighed Master Owl.", emotion: "sad" },
      { text: "Outside, Alfred was waiting impatiently for Wolf.", emotion: "neutral" },
      { text: "— Nothing beats sport to let off steam, he said. I've set up a special 'Excited Wolf' course. Ready?", emotion: "happy" },
      { text: "And off he shot like a rocket. Behind him, Wolf was running, jumping, crawling…", emotion: "happy" },
      { text: "Alfred stopped at the foot of a huge tree.", emotion: "neutral" },
      { text: "— See you at the top! he shouted as he disappeared into the leaves.", emotion: "excited" },
      { text: "At the top, Wolf looked down... His throat tightened, his heart pounded in his chest, his legs trembled.", emotion: "sad" },
      { text: "— Alfred, I'm scared! he panicked. I'm going to fall!", emotion: "sad" },
      { text: "How do you feel when you're scared?", emotion: "asking" },
      { text: "", emotion: "response" },
      { text: "— Calm down, Wolf. I'm right here with you. We'll climb down together, slowly.", emotion: "neutral" },
      { text: "Wolf took a deep breath and, trembling all over, climbed down.", emotion: "neutral" },
      { text: "— You've conquered your fear—you can be proud of yourself! Alfred congratulated him.", emotion: "happy" },
      { text: "Wolf smiled: oh yes, he was truly proud of himself!", emotion: "happy" },
      { text: "All this made me hungry, thought Wolf. That's perfect—Big Louie is waiting for me.", emotion: "happy" },
      { text: "Covered in flour, Big Louie was in the kitchen with Lona.", emotion: "neutral" },
      { text: "— They look like they're having so much fun together…, thought Wolf, jealous.", emotion: "sad" },
      { text: "— Hi, Wolf! said Big Louie. Today we're making macarons. To succeed with these treats, you have to be very, very patient. It's a great exercise for you, isn't it?", emotion: "happy" },
      { text: "At these words, Lona burst out laughing.", emotion: "happy" },
      { text: "Wolf felt his temper rising. He turned red, stomped his foot and exploded:", emotion: "sad" },
      { text: "— That's right, go ahead and make fun of me! he shouted, furious. I don't care! I don't even want to make stupid cookies with stupid people!", emotion: "sad" },
      { text: "Wolf stormed off, muttering under his breath and swiping angrily at the trees.", emotion: "sad" },
      { text: "Little by little, Wolf slowed down, until he was dragging his feet like a snail, his heart heavy. A tear rolled down his cheek.", emotion: "sad" },
      { text: "— I shouldn't have gotten angry, he sniffled. Lona will never love me again... I feel so sad...", emotion: "sad" },
      { text: "How do you feel when you're sad?", emotion: "asking" },
      { text: "", emotion: "response" },
      { text: "— Hey, what's wrong with my awesome buddy? came a voice behind him.", emotion: "neutral" },
      { text: "It was Miss Yeti. She gave him a big hug, then said:", emotion: "love" },
      { text: "— What's done is done. Now you have to fix your mistake! Go see Big Louie and Lona and apologize. You'll feel so much better afterward.", emotion: "happy" },
      { text: "— But what if Lona doesn't forgive me? asked Wolf, worried.", emotion: "sad" },
      { text: "— Nothing ventured, nothing gained, replied Miss Yeti. Go on now!", emotion: "happy" },
      { text: "Feeling ashamed, Wolf went back and knocked on Big Louie's door.", emotion: "sad" },
      { text: "— I'm sorry, my friends, he said. I didn't mean what I said. It wasn't kind.", emotion: "sad" },
      { text: "— Apology accepted, smiled Lona.", emotion: "happy" },
      { text: "Wolf and Lona looked at each other, hearts in their eyes. Wolf lifted his paws: he felt light, light, light! And... he was starving!", emotion: "love" },
      { text: "Let's eat now —the macarons are ready!", emotion: "happy" }
    ]
  }
};

function App() {
  const [currentStory, setCurrentStory] = useState<StoryKey>('french');
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showStorySelector, setShowStorySelector] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [language, setLanguage] = useState<'french' | 'english'>('french');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (isPlaying && !waitingForResponse) {
      const text = stories[currentStory].pages[currentPage].text;
      utteranceRef.current = new SpeechSynthesisUtterance(text);
      utteranceRef.current.lang = language === 'french' ? 'fr-FR' : 'en-US';
      utteranceRef.current.onend = () => {
        setCurrentPage((prev) => {
          if (prev < stories[currentStory].pages.length - 1) {
            const nextPage = prev + 1;
            if (stories[currentStory].pages[nextPage].emotion === 'asking') {
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
      asking: '/emotions/confus.png',
      neutral: '/emotions/neutral.png',
      surprised: '/emotions/surprised.png',
      excited: '/emotions/excited.png',
      love: '/emotions/love.png',
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
    setCurrentStory(lang);
    setCurrentPage(0);
    setIsPlaying(false);
    setWaitingForResponse(false);
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }
  };

  const handleEmojiClick = (emotion: Emotion) => {
    const responseTexts: Record<Emotion, string> = {
      happy: "Je suis content que tu sois heureux!",
      sad: "Ne sois pas triste, je suis là pour toi!",
      love: "Moi aussi, je t'aime beaucoup!",
    };

    const responseText = responseTexts[emotion];
    const updatedStory = { ...stories[currentStory] };
    updatedStory.pages[currentPage + 1].text = responseText;

    setWaitingForResponse(false);
    setCurrentPage((prev) => prev + 1);
    setIsPlaying(true);
  };

  const handleNextPage = () => {
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }
    setCurrentPage((prev) => Math.min(prev + 1, stories[currentStory].pages.length - 1));
    setIsPlaying(true);
  };

  const handlePreviousPage = () => {
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }
    setCurrentPage((prev) => Math.max(prev - 1, 0));
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-center text-purple-600 flex items-center gap-2">
              <BookOpen className="w-8 h-8" />
              QT Robot Storyteller
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowStorySelector(!showStorySelector)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                <BookOpenCheck className="w-5 h-5" />
                Choisir une histoire
              </button>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as 'french' | 'english')}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
              >
                <option value="french">Français</option>
                <option value="english">English</option>
              </select>
            </div>
          </div>

          {showStorySelector && (
            <div className="mb-8 grid grid-cols-1 gap-4">
              {Object.entries(stories).map(([key, story]) => (
                <button
                  key={key}
                  onClick={() => handleStorySelect(key as StoryKey)}
                  className={`p-4 text-left rounded-lg transition-colors ${
                    currentStory === key
                      ? 'bg-purple-100 border-2 border-purple-500'
                      : 'bg-gray-50 hover:bg-purple-50'
                  }`}
                >
                  <h3 className="font-semibold text-lg text-purple-700">{story.title}</h3>
                  <p className="text-gray-600 text-sm">{story.pages[0].text}</p>
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col items-center mb-8">
          <div className="relative w-60 h-60 mb-6">
            <img
              src="/emotions/teteQT.png" // image de fond circulaire ou décorative
              alt="cadre"
              className="absolute inset-0 w-full h-full object-contain z-10"
            />
            <div className="absolute inset-0 flex items-center justify-center mt-6">
              {getEmotionIcon(stories[currentStory].pages[currentPage].emotion)}
            </div>
          </div>

            <div className="text-xl text-center font-medium text-gray-700 min-h-[4rem]">
              {stories[currentStory].pages[currentPage].text}
            </div>
          </div>

          {waitingForResponse && (
            <div className="flex justify-center gap-4 mb-8">
              <button onClick={() => handleEmojiClick('happy')} className="p-4 rounded-full bg-yellow-200">
                <Smile className="w-8 h-8" />
              </button>
              <button onClick={() => handleEmojiClick('sad')} className="p-4 rounded-full bg-blue-200">
                <Frown className="w-8 h-8" />
              </button>
              <button onClick={() => handleEmojiClick('love')} className="p-4 rounded-full bg-red-200">
                <Heart className="w-8 h-8" />
              </button>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <button
              onClick={handlePreviousPage}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {isPlaying ? 'Pause' : 'Lecture'}
            </button>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
              disabled={currentPage === stories[currentStory].pages.length - 1 || waitingForResponse}
            >
              Suivant
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Recommencer
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">À propos du projet</h2>
          <p className="text-gray-700 mb-4">
            Cette interface simule le comportement du QT Robot lors de la narration d'histoires.
            Le robot affiche différentes expressions faciales en fonction du contexte de l'histoire,
            créant ainsi une expérience interactive et engageante pour les enfants de 3-4 ans.
          </p>
          <p className="text-gray-700">
            Dans la version finale sur le robot physique, l'interface utilisera la synthèse vocale
            et pourra éventuellement analyser les réactions de l'enfant pour adapter la narration.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

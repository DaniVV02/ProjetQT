import { useState, useEffect } from 'react';
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
      { text: "Ainsi,uand Loup était d'humeur joyeuse, il sifflotait, le cœur léger, faisait des blagues, parlait aux arbres… Il était plein d'énergie et débordait d'idées pour s'amuser !", emotion: "happy" },
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

  useEffect(() => {
    let timer: number;
    if (isPlaying && !waitingForResponse) {
      timer = window.setInterval(() => {
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
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentStory, waitingForResponse]);

  useEffect(() => {
    if (isPlaying) {
      speakText(stories[currentStory].pages[currentPage].text);
    }
  }, [currentPage, isPlaying, currentStory]);

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'happy':
        return <Smile className="w-32 h-32" />;
      case 'sad':
        return <Frown className="w-32 h-32" />;
      case 'love':
        return <Heart className="w-32 h-32" />;
      case 'asking':
        return <Meh className="w-32 h-32" />;
      default:
        return <Meh className="w-32 h-32" />;
    }
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR'; // Set the language to French
    window.speechSynthesis.speak(utterance);
  };

  const handleReset = () => {
    setCurrentPage(0);
    setIsPlaying(false);
    setWaitingForResponse(false);
  };

  const handleStorySelect = (storyKey: StoryKey) => {
    setCurrentStory(storyKey);
    setCurrentPage(0);
    setIsPlaying(false);
    setShowStorySelector(false);
    setWaitingForResponse(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-center text-purple-600 flex items-center gap-2">
              <BookOpen className="w-8 h-8" />
              QT Robot Storyteller
            </h1>
            <button
              onClick={() => setShowStorySelector(!showStorySelector)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              <BookOpenCheck className="w-5 h-5" />
              Choisir une histoire
            </button>
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
            <div className="bg-gray-100 rounded-full p-8 mb-6">
              {getEmotionIcon(stories[currentStory].pages[currentPage].emotion)}
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
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
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
              onClick={() => setCurrentPage(Math.min(stories[currentStory].pages.length - 1, currentPage + 1))}
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
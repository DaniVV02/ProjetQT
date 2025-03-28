import { useState, useEffect } from 'react';
import { Smile, Frown, Meh, Heart, BookOpen, BookOpenCheck } from 'lucide-react';

// Define the type for story keys
type StoryKey = keyof typeof stories;

// Define the type for emotions
type Emotion = 'happy' | 'sad' | 'love';

// Multiple stories with emotion markers
const stories = {
  friendship: {
    title: "L'Amitié Robot",
    pages: [
      { text: "Bonjour! Je suis QT, ton ami robot.", emotion: "happy" },
      { text: "Aujourd'hui, je vais te raconter une belle histoire.", emotion: "excited" },
      { text: "Il était une fois un petit robot très curieux...", emotion: "neutral" },
      { text: "Un jour, il rencontra un enfant qui était tout triste.", emotion: "sad" },
      { text: "Comment te sens-tu aujourd'hui?", emotion: "asking" },
      { text: "", emotion: "response" }, // Placeholder for the response
      { text: "Ensemble, ils devinrent les meilleurs amis du monde!", emotion: "love" },
    ]
  },
  adventure: {
    title: "L'Aventure au Parc",
    pages: [
      { text: "C'est une belle journée ensoleillée!", emotion: "happy" },
      { text: "Je décide d'aller explorer le parc.", emotion: "excited" },
      { text: "Oh! J'aperçois quelque chose dans les buissons...", emotion: "neutral" },
      { text: "C'est un petit oiseau blessé.", emotion: "sad" },
      { text: "Comment te sens-tu aujourd'hui?", emotion: "asking" },
      { text: "", emotion: "response" }, // Placeholder for the response
      { text: "Je l'aide à retrouver son nid, quelle belle aventure!", emotion: "love" },
    ]
  },
  discovery: {
    title: "La Découverte",
    pages: [
      { text: "Aujourd'hui, je veux apprendre quelque chose de nouveau!", emotion: "excited" },
      { text: "Dans mon jardin, je vois une petite graine.", emotion: "neutral" },
      { text: "Je la plante et j'attends...", emotion: "neutral" },
      { text: "Les jours passent, rien ne pousse...", emotion: "sad" },
      { text: "Comment te sens-tu aujourd'hui?", emotion: "asking" },
      { text: "", emotion: "response" }, // Placeholder for the response
      { text: "Oh! Une belle fleur apparaît enfin!", emotion: "happy" },
    ]
  }
};

function App() {
  const [currentStory, setCurrentStory] = useState<StoryKey>('friendship');
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

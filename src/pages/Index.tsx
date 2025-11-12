import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('calendar');

  const currentMonth = 'ноябрь';
  const romanNumerals = [
    'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
    'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
    'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII', 'XXVIII', 'XXIX', 'XXX'
  ];

  const dayIcons = [
    'Camera', 'Play', 'Film', 'Music', 'Cake', 'Car', 'Coffee', 'MessageCircle',
    'BookOpen', 'Ear', 'Plane', 'Palette', 'Mountain', 'Sunrise', 'Image',
    'Mic', 'Video', 'Eye', 'Briefcase', 'Feather', 'Map', 'Edit'
  ];

  const albums = [
    { title: 'Летние воспоминания', type: 'photo', count: 24, color: 'bg-[#F2FCE2]' },
    { title: 'Любимая музыка', type: 'music', count: 48, color: 'bg-[#FEF7CD]' },
    { title: 'Мои истории', type: 'text', count: 12, color: 'bg-[#FEC6A1]' },
  ];

  const shelfItems = [
    { title: 'Мастер и Маргарита', type: 'book', color: 'bg-[#8B5CF6]' },
    { title: 'The Beatles', type: 'vinyl', color: 'bg-[#1A1F2C]' },
    { title: 'Путешествия', type: 'album', color: 'bg-[#D946EF]' },
    { title: 'Война и мир', type: 'book', color: 'bg-[#F97316]' },
    { title: 'Pink Floyd', type: 'vinyl', color: 'bg-[#0EA5E9]' },
  ];

  const notesLines = Array(8).fill(null);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-2">
            творческое пространство
          </h1>
          <p className="text-lg text-muted-foreground">
            твой личный дневник в цифровом формате
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card border-2 border-primary/20">
            <TabsTrigger value="calendar" className="text-lg font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Календарь
            </TabsTrigger>
            <TabsTrigger value="albums" className="text-lg font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Альбомы
            </TabsTrigger>
            <TabsTrigger value="shelf" className="text-lg font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Полка
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 p-6 bg-card border-4 border-primary/30 shadow-xl">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-primary text-primary-foreground px-8 py-3 rounded-full border-4 border-primary/50 shadow-lg">
                    <h2 className="text-3xl font-bold">{currentMonth}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-5 md:grid-cols-7 gap-2 md:gap-3">
                  {romanNumerals.map((numeral, index) => (
                    <button
                      key={index}
                      className="aspect-square bg-accent hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-3xl border-3 border-primary/40 p-2 flex flex-col items-center justify-center gap-1 shadow-md hover:shadow-xl hover:scale-105 group"
                    >
                      <Icon 
                        name={dayIcons[index % dayIcons.length]} 
                        size={20} 
                        className="text-primary group-hover:text-primary-foreground transition-colors"
                      />
                      <span className="text-xs font-bold">{numeral}</span>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-card border-4 border-primary/30 shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-primary">заметки</h3>
                <div className="space-y-3">
                  {notesLines.map((_, index) => (
                    <div
                      key={index}
                      className="border-b-2 border-primary/30 pb-2"
                      style={{ minHeight: '24px' }}
                    />
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="albums" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album, index) => (
                <Card
                  key={index}
                  className={`p-6 ${album.color} border-4 border-primary/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer animate-scale-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-4 rounded-2xl shadow-lg">
                      <Icon
                        name={album.type === 'photo' ? 'Camera' : album.type === 'music' ? 'Music' : 'BookOpen'}
                        size={32}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary mb-2">{album.title}</h3>
                      <p className="text-muted-foreground font-semibold">
                        {album.count} {album.type === 'photo' ? 'фото' : album.type === 'music' ? 'треков' : 'записей'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 h-32 bg-background/50 rounded-xl border-2 border-primary/20 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground italic">предпросмотр контента</span>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="mt-6 p-8 bg-card border-4 border-dashed border-primary/40 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
              <div className="flex items-center justify-center gap-4">
                <div className="bg-primary/20 group-hover:bg-primary text-primary group-hover:text-primary-foreground p-4 rounded-full transition-all duration-300">
                  <Icon name="Plus" size={32} />
                </div>
                <span className="text-2xl font-bold text-primary">создать новый альбом</span>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="shelf" className="animate-fade-in">
            <Card className="p-8 bg-card border-4 border-primary/30 shadow-xl">
              <h2 className="text-4xl font-bold text-center mb-8 text-primary">моя полка</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
                {shelfItems.map((item, index) => (
                  <div
                    key={index}
                    className="cursor-pointer group animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`${item.color} h-48 rounded-lg shadow-lg border-4 border-primary/40 flex items-end justify-center p-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl`}
                    >
                      <div className="text-center">
                        <Icon
                          name={item.type === 'book' ? 'BookOpen' : item.type === 'vinyl' ? 'Disc' : 'Camera'}
                          size={32}
                          className="mx-auto mb-2 text-white drop-shadow-lg"
                        />
                        <p className="text-white font-bold text-sm drop-shadow-lg">{item.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  <Icon name="Image" size={24} className="text-primary" />
                  <h3 className="text-2xl font-bold text-primary">фотоальбом</h3>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-background rounded-lg border-4 border-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

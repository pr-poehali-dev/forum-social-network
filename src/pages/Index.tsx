import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface DayContent {
  text: string;
  photos: string[];
  mood: string;
}

interface ShelfItem {
  id: string;
  title: string;
  type: 'book' | 'vinyl' | 'photo-album' | 'sketchbook';
  color: string;
  rotation: number;
  height: number;
  content: {
    pages?: Record<number, string>;
    photos?: string[];
  };
}

const Index = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [dayContents, setDayContents] = useState<Record<number, DayContent>>({});
  const [currentText, setCurrentText] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [selectedShelfItem, setSelectedShelfItem] = useState<ShelfItem | null>(null);
  const [bookPage, setBookPage] = useState(0);
  const [shelfContents, setShelfContents] = useState<Record<string, any>>({});
  const [bookPageText, setBookPageText] = useState('');

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

  const shelfItems: ShelfItem[] = [
    { id: '1', title: 'Мастер и Маргарита', type: 'book', color: '#8B5CF6', rotation: -2, height: 180, content: { pages: {} } },
    { id: '2', title: 'The Beatles', type: 'vinyl', color: '#1A1F2C', rotation: 0, height: 160, content: {} },
    { id: '3', title: 'Летние фото', type: 'photo-album', color: '#D946EF', rotation: 1, height: 170, content: { photos: [] } },
    { id: '4', title: 'Мои скетчи', type: 'sketchbook', color: '#F97316', rotation: -1, height: 175, content: { pages: {} } },
    { id: '5', title: 'Война и мир', type: 'book', color: '#0EA5E9', rotation: 2, height: 190, content: { pages: {} } },
    { id: '6', title: 'Pink Floyd', type: 'vinyl', color: '#1A1F2C', rotation: 0, height: 160, content: {} },
  ];

  const notesLines = Array(8).fill(null);

  const handleDayClick = (dayIndex: number) => {
    setSelectedDay(dayIndex);
    const content = dayContents[dayIndex];
    if (content) {
      setCurrentText(content.text);
      setSelectedPhotos(content.photos || []);
    } else {
      setCurrentText('');
      setSelectedPhotos([]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhotos([...selectedPhotos, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDay = () => {
    if (selectedDay !== null) {
      setDayContents({
        ...dayContents,
        [selectedDay]: {
          text: currentText,
          photos: selectedPhotos,
          mood: dayIcons[selectedDay % dayIcons.length]
        }
      });
    }
    setSelectedDay(null);
    setSelectedPhotos([]);
  };

  const handleCloseDialog = () => {
    setSelectedDay(null);
    setCurrentText('');
    setSelectedPhotos([]);
  };

  const handleShelfItemClick = (item: ShelfItem) => {
    setSelectedShelfItem(item);
    setBookPage(0);
    const savedContent = shelfContents[item.id];
    if (savedContent?.pages && savedContent.pages[0]) {
      setBookPageText(savedContent.pages[0]);
    } else {
      setBookPageText('');
    }
  };

  const handleCloseShelfItem = () => {
    setSelectedShelfItem(null);
    setBookPage(0);
    setBookPageText('');
  };

  const handleSaveBookPage = () => {
    if (selectedShelfItem) {
      const updatedContent = {
        ...shelfContents,
        [selectedShelfItem.id]: {
          ...shelfContents[selectedShelfItem.id],
          pages: {
            ...(shelfContents[selectedShelfItem.id]?.pages || {}),
            [bookPage]: bookPageText
          }
        }
      };
      setShelfContents(updatedContent);
    }
  };

  const handleBookPageChange = (newPage: number) => {
    handleSaveBookPage();
    setBookPage(newPage);
    if (selectedShelfItem) {
      const savedContent = shelfContents[selectedShelfItem.id];
      if (savedContent?.pages && savedContent.pages[newPage]) {
        setBookPageText(savedContent.pages[newPage]);
      } else {
        setBookPageText('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-card border-r-4 border-primary/30 p-6 sticky top-0">
          <div className="flex flex-col items-center mb-8 animate-fade-in">
            <Avatar className="w-32 h-32 border-4 border-primary/40 shadow-xl mb-4">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=creative" />
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">КП</AvatarFallback>
            </Avatar>
            <h2 className="text-3xl font-bold text-primary text-center mb-2">
              Креативная<br/>Персона
            </h2>
            <p className="text-sm text-muted-foreground text-center italic">
              живу творчеством
            </p>
          </div>

          <div className="space-y-4">
            <Card className="p-4 bg-background border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Calendar" size={20} className="text-primary" />
                <span className="text-sm font-bold text-primary">Активность</span>
              </div>
              <p className="text-2xl font-bold text-primary">
                {Object.keys(dayContents).length} / 30
              </p>
            </Card>

            <Card className="p-4 bg-background border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="BookOpen" size={20} className="text-primary" />
                <span className="text-sm font-bold text-primary">На полке</span>
              </div>
              <p className="text-2xl font-bold text-primary">{shelfItems.length}</p>
            </Card>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <header className="mb-8 text-center animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold text-primary mb-2">
              творческое пространство
            </h1>
            <p className="text-lg text-muted-foreground">
              твой личный дневник в цифровом формате
            </p>
          </header>

          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 p-6 bg-card border-4 border-primary/30 shadow-xl animate-fade-in">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-primary text-primary-foreground px-8 py-3 rounded-full border-4 border-primary/50 shadow-lg">
                    <h2 className="text-3xl font-bold">{currentMonth}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-5 md:grid-cols-7 gap-2 md:gap-3">
                  {romanNumerals.map((numeral, index) => {
                    const hasContent = dayContents[index];
                    return (
                      <button
                        key={index}
                        onClick={() => handleDayClick(index)}
                        className={`aspect-square ${hasContent ? 'bg-primary text-primary-foreground' : 'bg-accent'} hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-3xl border-3 border-primary/40 p-2 flex flex-col items-center justify-center gap-1 shadow-md hover:shadow-xl hover:scale-105 group relative`}
                      >
                        {hasContent && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#8B5CF6] rounded-full border-2 border-card" />
                        )}
                        <Icon 
                          name={dayIcons[index % dayIcons.length]} 
                          size={20} 
                          className={`${hasContent ? 'text-primary-foreground' : 'text-primary'} group-hover:text-primary-foreground transition-colors`}
                        />
                        <span className="text-xs font-bold">{numeral}</span>
                      </button>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-6 bg-card border-4 border-primary/30 shadow-xl animate-fade-in">
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

            <Card className="p-8 bg-gradient-to-b from-[#2D1810] to-[#1A0F0A] border-4 border-[#4A2C1A] shadow-2xl animate-fade-in overflow-hidden">
              <h2 className="text-4xl font-bold text-center mb-6 text-[#D4AF37] flex items-center justify-center gap-3 drop-shadow-lg">
                <Icon name="BookMarked" size={36} />
                моя полка
              </h2>
              
              <div className="relative perspective-1000">
                <div className="relative bg-gradient-to-b from-[#4A3020] via-[#5C3D2E] to-[#4A3020] rounded-lg p-6 border-4 border-[#6B4D3A] shadow-inner">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJ3b29kIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM0QTMwMjAiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjd29vZCkiIG9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')] opacity-20" />
                  
                  <div className="relative flex justify-around items-end gap-3 min-h-[240px] pb-6">
                    {shelfItems.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => handleShelfItemClick(item)}
                        className="relative group transition-all duration-300 hover:scale-110 hover:-translate-y-3 cursor-pointer filter drop-shadow-2xl"
                        style={{
                          transform: `rotate(${item.rotation}deg) perspective(800px) rotateY(${item.rotation * 2}deg)`,
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        {item.type === 'vinyl' ? (
                          <div style={{ backgroundColor: item.color }} className="w-20 h-20 rounded-full border-4 border-[#1A0F0A] shadow-2xl flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] relative">
                            <div className="w-8 h-8 bg-[#FEF7CD] rounded-full border-2 border-[#1A0F0A]" />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent" />
                          </div>
                        ) : (
                          <div
                            style={{ 
                              backgroundColor: item.color,
                              height: `${item.height}px`,
                              boxShadow: '8px 8px 20px rgba(0,0,0,0.6), inset 2px 2px 4px rgba(255,255,255,0.1)'
                            }}
                            className="w-20 rounded-md border-l-4 border-r-2 border-t-2 border-b-4 border-[#1A0F0A] flex flex-col items-center justify-between p-3 relative group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 rounded-md" />
                            <Icon
                              name={item.type === 'book' ? 'BookOpen' : item.type === 'photo-album' ? 'Camera' : 'Brush'}
                              size={28}
                              className="text-[#FEF7CD] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] relative z-10"
                            />
                            <div className="text-[#FEF7CD] font-bold text-xs text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [writing-mode:vertical-lr] rotate-180 relative z-10">
                              {item.title}
                            </div>
                            <div className="absolute top-2 right-2 w-1 h-8 bg-gradient-to-b from-[#D4AF37] to-transparent opacity-60" />
                          </div>
                        )}
                        
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#2D1810] border-2 border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-2xl z-20">
                          {item.title}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="h-3 bg-gradient-to-b from-[#5C3D2E] to-[#3A2518] -mx-6 -mb-6 mt-2 border-t-2 border-[#6B4D3A]" />
                </div>
                
                <div className="absolute -bottom-2 left-4 right-4 h-4 bg-[#1A0F0A] rounded-b-xl opacity-40 blur-sm" />
              </div>
            </Card>
          </div>
        </main>
      </div>

      <Dialog open={selectedDay !== null} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="max-w-2xl bg-card border-4 border-primary/30 shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-4xl font-bold text-primary flex items-center gap-3">
              <Icon 
                name={selectedDay !== null ? dayIcons[selectedDay % dayIcons.length] : 'Calendar'} 
                size={36} 
              />
              День {selectedDay !== null ? romanNumerals[selectedDay] : ''}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div className="bg-background/50 rounded-xl p-6 border-2 border-primary/20">
              <h3 className="text-2xl font-bold text-primary mb-3 flex items-center gap-2">
                <Icon name="Edit" size={24} />
                записи дня
              </h3>
              <Textarea
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                placeholder="Что произошло сегодня? Опиши свои мысли, впечатления, идеи..."
                className="min-h-[200px] bg-background border-2 border-primary/20 text-base resize-none"
              />
            </div>

            <div className="bg-background/50 rounded-xl p-6 border-2 border-primary/20">
              <h3 className="text-2xl font-bold text-primary mb-3 flex items-center gap-2">
                <Icon name="Image" size={24} />
                фотографии
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {selectedPhotos.map((photo, i) => (
                  <div key={i} className="aspect-square bg-background rounded-lg border-4 border-primary/20 overflow-hidden">
                    <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                {selectedPhotos.length < 3 && (
                  <label className="aspect-square bg-background rounded-lg border-4 border-dashed border-primary/30 flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                    <Icon name="Plus" size={24} className="text-primary" />
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSaveDay}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl shadow-lg"
              >
                <Icon name="Check" size={20} className="mr-2" />
                Сохранить
              </Button>
              <Button
                onClick={handleCloseDialog}
                variant="outline"
                className="flex-1 border-2 border-primary/30 text-primary hover:bg-primary/10 text-lg py-6 rounded-xl"
              >
                <Icon name="X" size={20} className="mr-2" />
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedShelfItem !== null} onOpenChange={(open) => !open && handleCloseShelfItem()}>
        <DialogContent className="max-w-5xl bg-card border-4 border-primary/30 shadow-2xl max-h-[90vh] overflow-hidden p-8">
          {selectedShelfItem?.type === 'book' && (
            <div className="relative">
              <div className="flex gap-4 perspective-1000">
                <div className="flex-1 bg-gradient-to-br from-[#FEF7CD] via-[#FFF5D6] to-[#F5E6B8] rounded-lg border-4 border-[#8B7355] shadow-2xl p-8 min-h-[500px] relative transform rotate-y-[-2deg]">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXBlciIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNGRUY3Q0QiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGFwZXIpIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')] opacity-20 rounded-lg" />
                  <div className="absolute top-4 right-4 text-sm text-[#8B7355] font-bold">{bookPage * 2 + 1}</div>
                  <Textarea
                    value={bookPageText}
                    onChange={(e) => setBookPageText(e.target.value)}
                    onBlur={handleSaveBookPage}
                    placeholder="Начните писать свою историю..."
                    className="w-full h-[450px] bg-transparent border-none text-[#2D1810] text-base leading-relaxed resize-none focus:ring-0 focus:outline-none font-serif relative z-10"
                    style={{ fontFamily: 'Merriweather, serif' }}
                  />
                </div>
                <div className="flex-1 bg-gradient-to-br from-[#FEF7CD] via-[#FFF5D6] to-[#F5E6B8] rounded-lg border-4 border-[#8B7355] shadow-2xl p-8 min-h-[500px] relative transform rotate-y-[2deg]">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXBlciIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNGRUY3Q0QiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGFwZXIpIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')] opacity-20 rounded-lg" />
                  <div className="absolute top-4 right-4 text-sm text-[#8B7355] font-bold">{bookPage * 2 + 2}</div>
                  <div className="space-y-4 pt-8 relative z-10">
                    {Array(12).fill(null).map((_, i) => (
                      <div key={i} className="border-b border-[#8B7355]/30 pb-3" style={{ minHeight: '30px' }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <Button
                  onClick={() => handleBookPageChange(Math.max(0, bookPage - 1))}
                  disabled={bookPage === 0}
                  className="bg-[#2D1810] hover:bg-[#4A2C1A] text-[#D4AF37] border-2 border-[#6B4D3A]"
                >
                  <Icon name="ChevronLeft" size={20} className="mr-2" />
                  Назад
                </Button>
                <span className="text-xl font-bold text-primary px-4 py-2 bg-[#2D1810] rounded-lg border-2 border-[#D4AF37] text-[#D4AF37]">
                  {selectedShelfItem.title}
                </span>
                <Button
                  onClick={() => handleBookPageChange(bookPage + 1)}
                  className="bg-[#2D1810] hover:bg-[#4A2C1A] text-[#D4AF37] border-2 border-[#6B4D3A]"
                >
                  Вперёд
                  <Icon name="ChevronRight" size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {selectedShelfItem?.type === 'photo-album' && (
            <div className="relative">
              <div className="bg-gradient-to-br from-[#D946EF]/20 to-[#8B5CF6]/20 rounded-lg border-4 border-primary/40 shadow-xl p-8">
                <h3 className="text-3xl font-bold text-primary mb-6 text-center">{selectedShelfItem.title}</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative">
                      <div className="bg-background p-4 rotate-[-2deg] shadow-xl border-4 border-white">
                        <div className="aspect-[4/3] bg-muted rounded flex items-center justify-center">
                          <Icon name="Camera" size={48} className="text-muted-foreground" />
                        </div>
                        <p className="text-center mt-3 text-sm italic text-muted-foreground">Фото {i}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                onClick={handleCloseShelfItem}
                className="mt-6 w-full bg-primary hover:bg-primary/90"
              >
                Закрыть альбом
              </Button>
            </div>
          )}

          {selectedShelfItem?.type === 'sketchbook' && (
            <div className="relative">
              <div className="bg-gradient-to-br from-[#FEC6A1] via-[#FFD4B0] to-[#FEC6A1] rounded-lg border-4 border-[#8B7355] shadow-2xl p-8 min-h-[500px]">
                <h3 className="text-3xl font-bold text-[#2D1810] mb-6 text-center drop-shadow-lg">{selectedShelfItem.title}</h3>
                <div className="grid grid-cols-2 gap-6">
                  <Textarea
                    placeholder="Опишите ваш скетч или идею..."
                    className="bg-[#FFF5D6] rounded-lg p-4 border-2 border-[#8B7355] min-h-[350px] text-[#2D1810] resize-none font-serif"
                    style={{ fontFamily: 'Merriweather, serif' }}
                  />
                  <div className="bg-[#FFF5D6] rounded-lg p-4 border-2 border-[#8B7355] min-h-[350px] flex flex-col items-center justify-center gap-4">
                    <Icon name="Palette" size={64} className="text-[#8B7355]" />
                    <p className="text-sm text-[#8B7355] italic text-center">Место для рисунка</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleCloseShelfItem}
                className="mt-6 w-full bg-[#2D1810] hover:bg-[#4A2C1A] text-[#D4AF37] border-2 border-[#6B4D3A]"
              >
                Закрыть скетчбук
              </Button>
            </div>
          )}

          {selectedShelfItem?.type === 'vinyl' && (
            <div className="relative">
              <div className="bg-gradient-to-br from-[#2D1810] to-[#1A0F0A] rounded-lg border-4 border-[#6B4D3A] shadow-2xl p-12">
                <div className="flex flex-col items-center">
                  <div style={{ backgroundColor: selectedShelfItem.color }} className="w-72 h-72 rounded-full border-8 border-[#1A0F0A] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center mb-8 animate-spin-slow relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/5 to-transparent" />
                    <div className="w-28 h-28 bg-[#FEF7CD] rounded-full flex items-center justify-center border-4 border-[#1A0F0A] relative z-10">
                      <Icon name="Music" size={56} className="text-[#1A0F0A]" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-bold text-[#D4AF37] mb-4 drop-shadow-lg">{selectedShelfItem.title}</h3>
                  <p className="text-lg text-[#8B7355] italic">Классика музыки</p>
                </div>
              </div>
              <Button
                onClick={handleCloseShelfItem}
                className="mt-6 w-full bg-[#2D1810] hover:bg-[#4A2C1A] text-[#D4AF37] border-2 border-[#6B4D3A]"
              >
                Закрыть
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
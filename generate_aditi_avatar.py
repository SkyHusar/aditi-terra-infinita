"""Create a fictional AI persona avatar, not a photo of a real person.
Original hand-coded digital illustration; no uploads or external AI API.
"""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from pathlib import Path
import random, math
random.seed(61224)
S=768
image=Image.new('RGB',(S,S))
px=image.load()
for y in range(S):
 for x in range(S):
  d=math.hypot(x-410,y-332)/600
  glow=math.exp(-((x-465)**2+(y-238)**2)/(2*290**2))
  pink=math.exp(-((x-150)**2+(y-440)**2)/(2*220**2))
  px[x,y]=(int(8+29*glow+39*pink),int(10+13*glow+5*pink),int(27+57*glow+45*pink))
stars=Image.new('RGBA',(S,S));ds=ImageDraw.Draw(stars)
for i in range(210):
 x=random.randrange(S);y=random.randrange(S);r=random.choice([1,1,1,2,3])
 ds.ellipse((x-r,y-r,x+r,y+r),fill=random.choice(['#adf5ff','#e8afff','#97b8ff','#ffffef']))
for r in [292,310,328]:
 ds.arc((S/2-r,S/2-r-23,S/2+r,S/2+r-23),205,342,fill=(187,132,250,90),width=3)
image=Image.alpha_composite(image.convert('RGBA'),stars)
d=ImageDraw.Draw(image,'RGBA')
# aurora/halo
for rad in range(185,285,9):
 alpha=max(2,24-(rad-185)//6)
 d.ellipse((384-rad,310-rad,384+rad,310+rad),outline=(197,134,255,alpha),width=4)
# wide futuristic coat and shoulders
d.polygon([(72,768),(150,610),(259,568),(505,555),(638,599),(734,768)],fill=(20,18,44,255))
d.polygon([(83,768),(192,600),(286,574),(405,752)],fill=(67,43,114,255))
d.polygon([(728,768),(590,606),(515,581),(442,757)],fill=(45,43,113,255))
d.line([(154,632),(252,707),(367,768)],fill=(171,116,229,220),width=8,joint='curve')
d.line([(626,650),(535,710),(478,768)],fill=(109,225,225,200),width=8,joint='curve')
# hair behind head
d.ellipse((170,105,588,623),fill=(50,27,87,255))
for k in range(12):
 x=187+k*34
 pts=[(x-32*math.sin(y/65+k),y) for y in range(130,660,9)]
 d.line(pts,fill=random.choice([(188,115,232,160),(138,100,213,150),(222,128,224,120)]),width=random.randrange(12,29),joint='curve')
# neck
d.rounded_rectangle((332,488,451,619),25,fill=(223,150,151,255))
d.ellipse((307,530,481,643),fill=(53,34,72,255))
# face and cheeks
d.ellipse((225,164,550,552),fill=(234,177,176,255))
d.ellipse((232,186,541,536),fill=(247,191,184,255))
d.ellipse((257,346,325,409),fill=(237,124,154,67))
d.ellipse((460,346,524,412),fill=(245,114,156,70))
# soft nose, lips
d.arc((367,338,423,431),20,155,fill=(141,85,120,120),width=4)
d.arc((357,445,441,471),11,167,fill=(137,66,115,255),width=6)
d.ellipse((377,461,425,467),fill=(186,93,139,190))
# big eyes and brows
d.arc((275,319,365,348),190,338,fill=(64,38,80,255),width=9)
d.arc((422,313,511,346),195,345,fill=(64,38,80,255),width=9)
for x in [326,457]:
 d.ellipse((x-15,337,x+16,370),fill=(242,244,255,255))
 d.ellipse((x-7,339,x+8,367),fill=(83,72,144,255))
 d.ellipse((x-3,341,x+4,361),fill=(25,20,57,255))
 d.ellipse((x-1,342,x+4,346),fill=(255,255,255,255))
# bangs with swept lilac/pink hair
d.pieslice((191,117,561,479),177,310,fill=(99,52,138,255))
d.polygon([(214,263),(280,161),(388,160),(342,260),(267,325)],fill=(189,119,202,255))
d.polygon([(344,191),(442,144),(545,252),(509,298),(430,228)],fill=(158,111,219,255))
for x,y,x2,y2 in [(230,233,338,150),(262,267,369,167),(411,174,525,260),(437,197,532,291)]:
 d.line([(x,y),(x2,y2)],fill=(242,169,238,160),width=11)
# headphones behind hair, with star details
d.arc((201,122,568,553),190,345,fill=(133,205,246,255),width=19)
for x in [183,552]:
 d.rounded_rectangle((x-28,285,x+28,432),19,fill=(25,28,70,255),outline=(143,190,255,255),width=6)
 d.ellipse((x-18,331,x+18,383),fill=(106,63,166,255))
# signature and facial sparkle
for x,y in [(492,254),(255,422)]:
 d.line([(x-8,y),(x+8,y)],fill=(255,255,251,200),width=2)
 d.line([(x,y-8),(x,y+8)],fill=(255,255,251,200),width=2)
# hatched translucent lights
d.arc((129,78,617,615),200,320,fill=(235,151,255,160),width=8)
# ensure photo-like emblem is marked fictional inside the site's HTML
image=image.convert('RGB').resize((512,512),Image.Resampling.LANCZOS)
out=Path(__file__).with_name('aditi-imagined-portrait.webp')
image.save(out,'WEBP',quality=90,method=6)
print('ADITI_FICTIONAL_AVATAR_CREATED',out.stat().st_size)

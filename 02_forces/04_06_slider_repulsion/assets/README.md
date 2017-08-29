# assets
____________________

##symlinks to js libraries
- for each project, use root as base url to assets/js/lib-foo/current
- when updating a library, update the symlink such that 'current' always points to the current version

##dir structure :: assets/
```
/assets/
  /css/
    mysite_main.css
  /font/
    dope_font.font
  /img/
    /bkg/               #backgrounds
      bkg-header.gif
    /btn/               #buttons
      btn-submit.png 
    /lgo/               #logos, alphas
      lgo-jaylab.png 
    /pic/               #content images
      /project_name??/  # not so sure about project name.  this may cause unecessary redundancy, but it WILL keep everything modular
    /tex/               #particle textures
      tex-particle.png
  /js/
    /p5/
      /0.1.1-2014_12_12/
      /0.5.2-2016_06_17/
        /addons/
          p5.dom.js 
          p5.sound.js 
      current -> 0.5.2-2016_06_17/  #symlink to current lib 
    /handlebars/
      current -> handlebars-v4.0.5.js
      handlebars-v1.0.0.js
      handlebars-v4.0.5.js
  /media/
    /gif/
    /snd/
    /vid/
    
```
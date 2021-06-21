# BTD7 by deathnotepadPlusPlus
Stuyvesant High School
Soft Dev pd 9
P05: Fin
2020-06-11
## Team Members
  - Mohidul Abedin (PM)
  - Eric Lam
  - Brian Moses
  - Jason Zheng 
  
# What is this project? (Description)
Have you ever looked up at the sky enjoying fluffy clouds and the beautiful blue sky, when suddenly a balloon or a blimp with Coca Cola ad ruin your day? Well now you can vent all your frustration with our game Bloons TD7. 
Play through our diverse set of maps each with their own level of complexity.
Team up with a collection of powerful and unique characters.
To destroy all the evil bloons you can ever dream of, so you can enjoy the bright sky without any distrbance.
Follow the instructions below to play the game locally or visit our site to save highscores and compare it to others.


# Demo
[video demo here](https://youtu.be/MTIX3DdD7is)

# Site
http://157.245.214.96/

# Launch instructions
We are assuming you have python3 and pip3 installed and working.
Run the following:
1. Clone the repo
    ```bash
    $ git clone git@github.com:Mabedin00/deathnotepadPlusPlus.git
    ```
2. Change directory into it
    ```bash
    $ cd deathnotepadPlusPlus
    ```
3. Create a python virtual environment
    ```bash
    $ python3 -m venv superhero
    ``` 
4. Use the virtual environment
    ```bash
   # if you are using bash
   $ . superhero/bin/activate
   # if you are using zsh
   $ source superhero/bin/activate
   
   # To deactivate run this
   $ deactivate
   ```
5. Install the required packages
    ```bash
    $ pip3 install -r requirements.txt 
    ```
6. Run make
    ```bash
    $ python3 -m dethpad.__init__ 
    ```
7. Visit ```http://127.0.0.1:5000/``` in your browser to start using!

8. If you use uBlock Origin you might need to disable it because it stops some of the sprites created through phaser 

new Vue({
  el: '#app',
  data: {
    inGame: false,
    monsterHealth: 100,
    yourHealth: 100,
    healing: 10
  },
  methods:{
    startGame: function(){
      initGame();
    },
    restartGame: function(){
      this.init(game);
    },
    initGame: function () {
      this.monsterHealth = 100;
      this.yourHealth = 100;
      this.inGame=true;
    },
    heal: function(){
      yourHeath+=healing;
      if(yourHealth>100){
        yourHealth=100;
      }
    },
    attack:function(num){

    },
    speicalAttack:function(){

    },
    randomNumber: function(num){
      if(typeof num != 'undefined'){
        return (Math.floor(Math.random() * num));
      }
      else{
        return Math.random();
      }
    }
  }

});

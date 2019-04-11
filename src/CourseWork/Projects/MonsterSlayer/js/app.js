new Vue({
  el: '#app',
  data: {
    inGame: false,
    monsterHealth: 100,
    yourHealth: 100,
    healing: 10,
    message:'',
    playLog: [],
  },
  filters :{
    percentage : function (num) {
      if (num > 100) {
        return '100%';
      } else if (num <= 0) {
        return 'DEAD!!';
      } else {
        return num.toFixed(0) + '%'
      }
    },
  },
  methods:{

    endGame: function(){
      if(this.monsterHealth <=0 || this.yourHealth <=0){
        this.inGame=false;
        if(this.monsterHealth>0 && this.monsterHealth>this.yourHealth){
          this.message ="Monster wins! Better luck next time."
        }
        else if(this.yourHealth > 0 && this.yourHealth> this.monsterHealth){
          this.message ="You won!";
        }
        else{
          this.message ="World peace has been established. Both you and the monster are dead";
        }

      }
    },
    health : function(status){
      if(status <=0) {
        return {width: '0%'};
      }
      else if(status > 100){
        return {width: '100%', backgroundColor: 'green'};
      }
      else{
        return {width: status.toFixed(0)+"%", backgroundColor: 'green'};
      }

    },
    startGame: function(){
      this.initGame();
    },
    restartGame: function(){
      this.initGame();
    },
    giveUp : function(){
      this.inGame=false;
      this.message="You withdrew from the match.";
    },
    initGame: function () {
      this.monsterHealth = 100;
      this.yourHealth = 100;
      this.message ="Game on!";
      this.playLog= [];
      this.inGame=true;
    },
    heal: function(){
      //healing will be two randomNumbers added together
      let healing = this.randomNumber() + this.randomNumber() + this.yourHealth;
      let initialValue = this.yourHealth;
      if(healing>100){
        this.yourHealth=100;
      }
      else{
        this.yourHealth = healing;
      }
      this.playLog.push({id: this.playLog.length+1, aggressor: 'Player', action: 'Heals', victim: 'self', value: this.yourHealth - initialValue });
      //monster attacks after healing
      this.attack('monster');
    },
    attack:function(aggressor,num){
      //attack will be a random number plus a random number if monster is a aggressor
      if(aggressor=='monster'){
        let damage = this.randomNumber() + this.randomNumber();
        this.playLog.push({id: this.playLog.length+1, aggressor: 'Monster', action: 'attacks', victim: 'Player', value: damage });
        this.yourHealth-= damage;
        this.endGame();
      }
      // attack will be a random number if player is aggressor
      if(aggressor =='you'){
        if(typeof num=='undefined'){
          //not a special attack
          num=1;
        }
        let damage = this.randomNumber()*num;
        this.playLog.push({id: this.playLog.length+1, aggressor: 'You', action: 'attack', victim: 'Monster', value: damage });
        this.monsterHealth-= damage;
        this.attack('monster');
      }
    },
    //special attack is instigated by you and is a multiplier of two random numbers
    specialAttack:function(){
      let attackMultiplier =  this.randomNumber();
      this.attack('you',attackMultiplier);
    },
    randomNumber: function(){
      //returns a number between 1 and 10
        return (Math.ceil(Math.random() * 10));

    }
  }

});

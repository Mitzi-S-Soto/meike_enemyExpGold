/*:
*
*@plugindesc Enemy EXP and Gold Plugin
*
*
*@author Meike (Mitzi S. Soto)
*
*@param EXP Formula
*@desc The Formula used to determin EXP Gain from an enemy.
*@default enemy.exp()
*
*@param Gold Formula
*@desc The Formula used to determin Gold Drop from an enemy.
*@default enemy.gold()
*
*@help
*
*This plugin makes it so you can use a
*custom formula to evaluate how much exp
*is earned from defeating an enemy and
*how much gold is dropped.
*
*Note: these formulas determine drop PER enemy.
*So if a Troop has 3 enemies, the formula will run
*for each enemy and add the three totals together for
*your final drop.
*
______________________________
*Instructions
*______________________________
*
*Change the EXP Formula Parameter to a Javascript evaluation.
*Change the Gold Formula Parameter to a Javascript evaluation.
*
______________________________
*Plugin Command(s)
*______________________________
*meikeGoldFormula - Used to change the Gold Formula in game
*Example: meikeGoldFormula enemy.gold()*enemy.level
*
*meikeGoldReset - Used to reset the Gold Formula to the Plugin Parameter
*
*meikeExpFormula - Used to change the EXP Formula in game
*Example: meikeExpFormula enemy.level*enemy.exp()+1
*
*meikeGoldReset - Used to reset the EXP Formula to the Plugin Parameter
*
*
______________________________
*Terms of Use
*______________________________
*Free for non-commercial and commercial purposes
*as long as Meike is credited and a link to
*meike.hehasplans.com is given.
*
*
*
* 
*/
(function(){
		
	
	
	/*-----------------------------------
	PLUGIN COMMANDS
	-----------------------------------*/
	var _Game_Interpeter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args){
		_Game_Interpeter_pluginCommand.call(this, command, args);
		
		if(command == "meikeGoldFormula"){
			var goldFormula = args[0];
			Game_Troop.prototype.goldTotal = function() {
				return this.deadMembers().reduce(function(r, enemy) {
				return r + eval(goldFormula);
				}, 0) * this.goldRate();
			};
		}
		
		if(command == "meikeGoldReset"){
			var goldFormula = parameters['Gold Formula'];
			Game_Troop.prototype.goldTotal = function() {
				return this.deadMembers().reduce(function(r, enemy) {
				return r + eval(goldFormula);
				}, 0) * this.goldRate();
			};
		}
		
		if(command == "meikeExpFormula"){
			var expFormula = args[0];
			Game_Troop.prototype.expTotal = function() {
				return this.deadMembers().reduce(function(r, enemy) {
				return r + eval(expFormula);
				}, 0);
			};
		}
		
		if(command == "meikeExpReset"){
			var expFormula = parameters['EXP Formula'];
			Game_Troop.prototype.expTotal = function() {
				return this.deadMembers().reduce(function(r, enemy) {
				return r + eval(expFormula);
				}, 0);
			};
		}
	};
	
	var parameters = PluginManager.parameters('meike_enemyExpGold');
	var expFormula = parameters['EXP Formula'];
	var goldFormula = parameters['Gold Formula'];
	
	Game_Troop.prototype.expTotal = function() {
    return this.deadMembers().reduce(function(r, enemy) {
        return r + eval(expFormula);
    }, 0);
	};
	
	Game_Troop.prototype.goldTotal = function() {
    return this.deadMembers().reduce(function(r, enemy) {
        return r + eval(goldFormula);
    }, 0) * this.goldRate();
	};
	
})();



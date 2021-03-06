const DrawCard = require('../../drawcard.js');

class Deathseeker extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            title: 'Remove fate/discard character',
            when: {
                afterConflict: event => event.conflict.loser === this.controller && event.conflict.isAttacking(this)
            },
            cost: ability.costs.sacrificeSelf(),
            target: {
                cardType: 'character',
                gameAction: 'discardCardFromPlay',
                cardCondition: card => card.location === 'play area' && card.controller !== this.controller
            },
            handler: context => {
                if(context.target.fate === 0) {
                    this.game.addMessage('{0} sacrifices {1} to discard {2}', context.cardStateWhenInitiated.controller, this, context.target);
                    context.target.owner.discardCardFromPlay(context.target);
                } else {
                    this.game.addMessage('{0} sacrifices {1} to remove 1 fate from {2}', context.cardStateWhenInitiated.controller, this, context.target);
                    context.target.modifyFate(-1);                    
                }
            }
        });
    }
}

Deathseeker.id = 'deathseeker';

module.exports = Deathseeker;

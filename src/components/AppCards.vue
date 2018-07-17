<template>
    <div>
        <div class="card">
            <div class="word">
                {{ wordsPair[state] }}
            </div>
        </div>

        <div class="container buttons">
            <div class="buttons-title">
                {{ questions[state] }}
            </div>

            <div class="row" v-if="state === 0">
                <div class="fullwidth">
                    <button class="open" @click="open">Open</button>
                </div>
            </div>
            <div class="row" v-else>
                <div class="left">
                    <button class="no" @click="no">No</button>
                </div>
                <div class="right">
                    <button class="yes" @click="yes">Yes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Card from '../interfaces/Card';
  import Dictionary from '../services/dictionary';
  import deck from '../data/decks/deck.1.json';

  const dictionary = new Dictionary(deck);

  @Component
  export default class AppCards extends Vue {
    wordsPair: string[] = [];
    state: number = 0;
    questions = ['Know the word?', 'Guessed it right?'];

    created(): void {
      this.wordsPair = [
        dictionary.currentCard.word,
        dictionary.currentCard.translation,
      ];
    }

    yes(): void {
      dictionary.setGuessed();
      this.state = 0;
      this.nextWord();
    }

    no(): void {
      dictionary.setUnguessed();
      this.state = 0;
      this.nextWord();
    }

    open(): void {
      this.state = 1;
    }

    nextWord(): void {
      dictionary.getNextCard();

      this.wordsPair = [
        dictionary.currentCard.word,
        dictionary.currentCard.translation,
      ];
    }
  }
</script>

<style scoped lang="scss"></style>

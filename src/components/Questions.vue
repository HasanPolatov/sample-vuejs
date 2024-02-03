<script setup>
import {onMounted, ref} from 'vue'
import {fetchQuestions} from "../services/apiService.js";

const tabs = ref(["q1", "q2"]);
const components = ref(["q11", "q22"]);

const currentTab = ref(
    {
      index: 0
    }
);

const questions = ref([
  {
    question: "",
    answers: [
      ""
    ]
  }
]);

const checkRequest = ref(
    {
      testCode: "",
      questions: [
        {
          questionNumber: 0,
          question: "",
          answer: ""
        }
      ]
    }
);

onMounted(async () => {
  questions.value = await fetchQuestions();
});

const changeTab = (index) => {
  currentTab.value.index = index;
}

const select = (question, index, answerIndex) => {

  console.log("Hello")
  console.log(question)
  console.log(index)
  console.log(answerIndex)
  checkRequest.value.questions[index] = {
    questionNumber: index + 1,
    question: question.question,
    answer: question.answers[answerIndex]
  }

  console.log(checkRequest.value);

}

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-1">
        <div class="tab-navigation">
          <button
              v-for="(tab, index) in questions"
              :key="index"
              class="tab-button"
              :class="{ active: currentTab.index === index }"
              @click="changeTab(index)"
          >
            {{ index + 1 }}
          </button>
        </div>
      </div>
      <div class="col-md-9">
        <div class="tab-content" id="v-pills-tabContent">
          <div v-for="(question, index) in questions" :key="index">
            <div v-if="currentTab.index === index">
              <p>{{ question.question }}</p>
              <form>
                <template v-for="(answer, testId) in question.answers" :key="answer">
                  <div class="answer-container">
                    <label
                        :for="testId"
                        class="answer-label"
                        :class="{ active: checkRequest.questions[index]?.answer === answer }"
                    >
                      {{ answer }}
                    </label>
                    <input type="radio" hidden :name="index" @click="select(question, index, testId)" :id="testId">
                  </div>
                </template>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 20px;
}

.tab-navigation {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tab-button {
  cursor: pointer;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: #fff;
  transition: background-color 0.3s ease-in-out;
}

.tab-button.active {
  background-color: #007bff;
  color: #fff;
}

.tab-content {
  margin-left: 20px;
}

.answer-container {
  margin-bottom: 10px;
}

.answer-label {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  transition: background-color 0.3s ease-in-out;
}

.answer-label.active {
  background-color: #007bff;
  color: #fff;
}

</style>


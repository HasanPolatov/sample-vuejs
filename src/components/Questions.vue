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
      <div class="d-flex align-items-star">
        <div class="col-md-1">
          <div class="nav nav-pills justify-content-center gap-2" id="v-pills-tab" role="tablist"
               aria-orientation="vertical">
            <button
                v-for="(tab, index) in questions" :key="index"
                class="btn rounded-circle"
                :class="checkRequest.questions[index]?.question === tab.question ? 'active btn-primary border-3': 'btn-light border-primary border-3'"
                @click="changeTab(index)">
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
                    <div class="mb-3">
                      <label
                          :for="testId"
                          class="form-control"
                          :class="checkRequest.questions[index]?.answer === answer ? 'active border-primary': ''"
                      >{{ answer }}</label>
                      <input type="radio" hidden :name="index" @click="select(question, index, testId)" :id="testId">
                    </div>
                  </template>

                  <!--            <pre>{{checkRequest}}</pre>-->

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

#v-pills-tab {
  max-height: 600px;
  width: auto;
  overflow-y: scroll;
  scrollbar-width: none;
  padding: 0 10px;
  max-width: 60px;
}

</style>

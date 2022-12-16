


function GetDatasById(id){
    fetch("https://apigenerator.dronahq.com/api/g4C15xPP/students")

    .then((data) => {
      if (!data.ok) {
        throw Error(data.status)
      }
      return data.json();
    })

    .then((update) => {
      let findStudent = {}
      update.filter((item) => {
        return item.id === id && (findStudent = item)
      })

      const newStudent = {}
      newStudent.Name = findStudent.Name

      fetch("https://apigenerator.dronahq.com/api/75U0yEKU/tasks")
      .then((data) => {
        if(!data.ok) {
            throw Error(data.status)
        }
        return data.json();
      })
      .then((update) => {
        let findTask = {}

        update.filter((item) => {
          return item.id === id && (findTask = item)
        })

        newStudent.TaskTitle = findTask.title

        fetch("https://apigenerator.dronahq.com/api/5Bba_f-L/grades")
        .then((data) => {
           if(!data.ok){
            throw Error(data.status)
           }
           return data.json()
        })
        .then((update) => {
          let findRate = {}

          update.filter((item) => {
            return item.studentID === id && (findRate = item)
          })

          newStudent.Rate = findRate.number

          console.log(newStudent)
        })

      })

    })
    .catch((error) => {
      console.log(error)
    }
)
}

function CalculateAverageStudentById(id){
  fetch("https://apigenerator.dronahq.com/api/g4C15xPP/students")

    .then((data) => {
      if (!data.ok) {
        throw Error(data.status)
      }
      return data.json();
    })

    .then((update) => {
      let findStudent = {}
      update.filter((item) => {
        return item.id === id && (findStudent = item)
      })

      fetch("https://apigenerator.dronahq.com/api/5Bba_f-L/grades")
        .then((data) => {
           if(!data.ok){
            throw Error(data.status)
           }
           return data.json()
        })
        .then((update) => {
          const studentDatas = {}
          let rates = []

          update.filter((item) => {
            return item.studentId === String(id) && (rates.push(Number(item.number)))
          })

          let total = rates.reduce(function(acc, number){
            return acc + number
          },0)

          total = total / rates.length

          studentDatas.Name = findStudent.Name
          studentDatas.Average = total
          console.log(studentDatas)
        }
      )
    }
  )  
}

function pendingTasks(id) {
  fetch("https://apigenerator.dronahq.com/api/5Bba_f-L/grades")
    .then((data) => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    })

    .then((update) => {
      let pendingTasks = [];
      let activitiesDelivered = [];
      update.filter((element) => {
        if (element.studentId === id) {
          activitiesDelivered.push(element.taskId);
        }
      });
      activitiesDelivered.includes("1") === false && pendingTasks.push("1");
      activitiesDelivered.includes("2") === false && pendingTasks.push("2");
      activitiesDelivered.includes("3") === false && pendingTasks.push("3");
      activitiesDelivered.includes("4") === false && pendingTasks.push("4");
      activitiesDelivered.includes("5") === false && pendingTasks.push("5");
      activitiesDelivered.includes("6") === false && pendingTasks.push("6");

      console.log(pendingTasks, activitiesDelivered);
    });
}

function deliverCertainActivity(nameActivity) {
  let idActivity;
  let studentID = [];
  let numbers = [];
  fetch("https://apigenerator.dronahq.com/api/75U0yEKU/tasks")
    .then((data) => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    })
    .then((update) => {
      update.filter((element) => {
        if (element.title === nameActivity) {
          idActivity = String(element.id);
        }
      });
    });
  fetch("https://apigenerator.dronahq.com/api/5Bba_f-L/grades")
    .then((data) => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    })

    .then((update) => {
      update.forEach((element) => {
        if (idActivity === element.taskId) {
          numbers.push(element.number);
          studentID.push(Number(element.studentId));
        }
      });
    });
  fetch("https://apigenerator.dronahq.com/api/g4C15xPP/students")
    .then((data) => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    })

    .then((update) => {
      let id = [];
      update.forEach((element) => {
        id.push(element.id);
      });
      for (let a = 0; a < id.length; a++) {
        for (let b = 0; b < id.length; b++) {
          if (studentID[a] === id[b]) {
            console.log(`Nome ${update[id[a]].Name} Nota: ${numbers[a]}`);
          }
        }
      }
    });
}
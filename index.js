


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
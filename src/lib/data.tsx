export interface Student {
    rollNo: string
    name: string
    selected: boolean
    role: string
    mentor: string
  }
  
  export const students: Student[] = [
    {
        rollNo: "23BD1A050Q",
        name: "B Sai Rushik",
        selected: true,
        role: "Video Editor",
        mentor: "Vardaan",
      },
      {
        rollNo: "23BD1A0534",
        name: "Syanthan",
        selected: true,
        role: "Content Creator",
        mentor: "Jishnu, Sreekruthi and Nithya",
      },
      {
        rollNo: "23BD1A056H",
        name: "Rishika Jala",
        selected: true,
        role: "Documentation Incharge",
        mentor: "Akshaya",
      },
      {
        rollNo: "23BD1A056K",
        name: "Rythma Reddy",
        selected: true,
        role: "Graphic Designer",
        mentor: "Sandeep",
      },
      {
        rollNo: "23BD1A056G",
        name: "Rishab Deshpande",
        selected: true,
        role: "Sponsorship Manager",
        mentor: "Vardaan",
      },
      {
        rollNo: "23BD1A6602",
        name: "Arnav Agarwal",
        selected: true,
        role: "Developer",
        mentor: "Vardaan",
      },
      {
        rollNo: "23BD1A1205",
        name: "Rishik",
        selected: true,
        role: "CR Manager",
        mentor: "Rishi",
      },
      {
        rollNo: "23BD1A051D",
        name: "Vahini",
        selected: false,
        role: "Graphic Designer",
        mentor: ""
      },
      {
        rollNo: "23BD1A0564",
        name: "Riya Asalla",
        selected: false,
        role: "Sponsorship Manager",
        mentor: ""
      },
      {
        rollNo: "23BD1A6608",
        name: "Brahmadevara Sri Vijju",
        selected: false,
        role: "Sponsorship Manager",
        mentor: ""
      },
      {
        rollNo: "23BD1A0505",
        name: "Aditya Panyala",
        selected: false,
        role: "CR Manager",
        mentor: ""
      },
      {
        rollNo: "23BD1A663C",
        name: "Vajra Chaitanya",
        selected: false,
        role: "Documentation Incharge",
        mentor: ""
      },
      {
        rollNo: "23BD1A05CD",
        name: "Abhinandan Goud",
        selected: false,
        role: "Video Editor",
        mentor: ""
      }
  ]
  
  // Updated to only check roll number
  export function getStudent(rollNo: string): Student | undefined {
    return students.find((student) => student.rollNo === rollNo)
  }


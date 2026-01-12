// profileSchemas.js
export const PROFILE_SCHEMAS = {
  student: {
    name: "string",
    uid: "string",
    avatar: "string",
    fields: [
      ["Enrollment No", "enrollmentNo"],
      ["Roll No", "rollNo"],
      ["Email", "email"],
      ["Father", "father"],
      ["Mother", "mother"],
      ["Course", "course"],
      ["Branch", "branch"],
      ["Semester", "semester"],
      ["Joined Year", "joinedYear"],
    ],
    showAttendance: true,
    showRespectiveStudent: false,
  },

  teacher: {
    name: "string",
    uid: "string",
    avatar: "string",
    fields: [
      ["Employee ID", "employeeId"],
      ["Email", "email"],
      ["Department", "department"],
      ["Designation", "designation"],
      ["Experience", "experience"],
      ["Qualification", "qualification"],
    ],
    showAttendance: false,
    showRespectiveStudent: true,
  },

  hod: {
    name: "string",
    uid: "string",
    avatar: "string",
    fields: [
      ["Employee ID", "employeeId"],
      ["Email", "email"],
      ["Department", "department"],
      ["Office", "office"],
      ["Experience", "experience"],
    ],
    showAttendance: false,
    showRespectiveStudent: false,
  },

  administrator: {
    name: "string",
    uid: "string",
    avatar: "string",
    fields: [
      ["Admin ID", "adminId"],
      ["Email", "email"],
      ["Role Level", "level"],
      ["Office", "office"],
    ],
    showAttendance: false,
    showRespectiveStudent: false,
  },

  admin: {
    name: "string",
    uid: "string",
    avatar: "string",
    fields: [
      ["Admin ID", "adminId"],
      ["Email", "email"],
      ["System Scope", "scope"],
    ],
    showAttendance: false,
    showRespectiveStudent: false,
  },

  library: {
    name: "string",
    uid: "string",
    avatar: "string",
    fields: [
      ["Library ID", "libraryId"],
      ["Email", "email"],
      ["In-Charge", "incharge"],
      ["Department", "department"],
      ["Total Books", "totalBooks"],
      ["Issued Books", "issuedBooks"],
    ],
    showAttendance: false,
    showRespectiveStudent: false,
  },
};

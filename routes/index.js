import {
  regPioneer,
  regStudent,
  regTeacher,
  regNonStudent,
  regNigerianClass,
  getDefaultClasses,
  regPioneerNigerClass,
  getPioneerNigerClass,
  nigerTimetable,
  getTimetable,
  getAllPioneer,
  getStudentScreenPioneer,
  saveAdminQuestions,
  getAdminQuestions,
  studentAdmittedClass,
  studentSpecificClass,
  studentSpecificTimetable,
  loginStudent,
  loginPioneer,
  getStudentForPioneerNow,
} from "../controllers/index.js";
import express from "express";
import { authPioneer } from "../middleware/index.js";
const router = express.Router();

router.post("/regpioneer", regPioneer);
router.post("/regstudent", regStudent);
router.post("/regteacher", regTeacher);
router.post("/regnonstudent", regNonStudent);
router.post("/saveAdminQuestions", saveAdminQuestions);
// router.post("/regschool", authPioneer, regSchool);
router.post("/regnigerianclass", regNigerianClass);
router.post("/studentAdmittedClass", studentAdmittedClass);
router.get("/defaultclasses", getDefaultClasses);
router.post("/saveNigerTimetable", nigerTimetable);
router.get("/getTimetable", getTimetable);
router.get("/getAdminQuestions", getAdminQuestions);
router.get("/getAllPioneer", getAllPioneer);
router.post("/regPioneerNigerClass", regPioneerNigerClass);
router.get("/getPioneerNigerClass", getPioneerNigerClass);
router.get("/getStudentScreenPioneer", getStudentScreenPioneer);
router.get("/loginpioneerstudent", loginStudent);
router.get("/loginpioneer", loginPioneer);
router.get("/studentSpecificClass", studentSpecificClass);
router.get("/studentSpecificTimetable", studentSpecificTimetable);
router.get("/getStudentForPioneerNow", getStudentForPioneerNow);
export default router;

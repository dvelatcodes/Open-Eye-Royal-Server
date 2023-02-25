import NigerianClass from "../models/defaultNigerClass.js";
import AdminQuestions from "../models/adminQuestions.js";
import PioneerNigerClass from "../models/pioneerNigerClass.js";
import NonStudent from "../models/nonStudent.js";
import Pioneer from "../models/pioneer.js";
import NigerTimetable from "../models/timetable.js";
// import School from "../models/school.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
// import Subject from "../models/subject.js";
// import SchemeOfWork from "../models/schemeOfWork.js";
import { genAuthToken } from "../reusableFunction/genAuthToken.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
// reg pioneer Post method
// reg pioneer Post method
export const regPioneer = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Pioneer.findOne({ email });
    if (user) {
      throw new Error("Pioneer already exist");
    } else {
      const salt = await bcrypt.genSalt(10);
      const pioneer = new Pioneer(req.body);

      pioneer.password = await bcrypt.hash(pioneer.password, salt);
      await pioneer.save();
      res.status(200).json({
        token: genAuthToken(pioneer._id),
        pioneer,
      });
    }
  } catch (err) {
    res.status(401).send({ message: "Pioneer already exist" });
  }
};
// getPioneer
// getPioneer
export const getAllPioneer = async (req, res) => {
  try {
    const pioneerSchools = await Pioneer.find();
    if (pioneerSchools.length > 0) {
      res.status(200).json(pioneerSchools);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
// reg nigerian class Post method
// reg nigerian class Post method
export const regNigerianClass = async (req, res) => {
  try {
    const newClass = new NigerianClass(req.body);
    await newClass.save();
    res.status(200).json({
      nigerClass: newClass,
    });
  } catch (err) {
    res.json({ message: err });
  }
};
// save AdminQuestions
// save AdminQuestions
export const saveAdminQuestions = async (req, res) => {
  try {
    if (req.body) {
      const saveQuestions = new AdminQuestions(req.body);
      if (saveQuestions) {
        await saveQuestions.save();
        res.status(200).send(saveQuestions.defaultQuestions);
      }
    }
  } catch (error) {
    res.status(401).send(error);
  }
};
// get AdminQuestions
// get AdminQuestions
export const getAdminQuestions = async (req, res) => {
  try {
    const getQuestions = await AdminQuestions.find({
      _id: req.query.questionId,
    });
    if (getQuestions) {
      const container = getQuestions[0];
      const { defaultQuestions } = container;
      res.status(200).send(defaultQuestions);
    }
  } catch (error) {
    res.status(401).send(error);
  }
};
// reg PioneerNigerClass Post Method
// reg PioneerNigerClass Post Method
export const regPioneerNigerClass = async (req, res) => {
  try {
    const { pioneerIdNum, classNaming } = req.body;
    const checker = await PioneerNigerClass.find({
      classNaming: classNaming,
      pioneerIdNum: pioneerIdNum,
    });
    if (checker.length >= 1) {
      throw new Error("Class Already Exist") && console.log("error");
    } else {
      const newPioneerClass = new PioneerNigerClass(req.body);
      await newPioneerClass.save();
      res.status(200).json(newPioneerClass);
    }
  } catch (error) {
    res.status(401).send(error);
  }
};
// getPioneerNigerClass
// getPioneerNigerClass
export const getPioneerNigerClass = async (req, res) => {
  try {
    if (req.query.schoolStudentSelected) {
      const studentScreeningSchool = await PioneerNigerClass.findOne(
        req.query.schoolStudentSelected
      );
    }
    // console.log(req.query);
    const { pioneerId, schSection } = req.query;
    const pioneerClass = await PioneerNigerClass.find({
      pioneerIdNum: pioneerId,
      // calenderSection: schSection,
    });
    if (pioneerClass) {
      var arr = [];
      pioneerClass.map((data) => {
        if (data.classNaming.match("JSS 1") && !arr.includes("JSS 1"))
          arr.push("JSS 1");
        if (data.classNaming.match("JSS 2") && !arr.includes("JSS 2"))
          arr.push("JSS 2");
        if (data.classNaming.match("JSS 3") && !arr.includes("JSS 3"))
          arr.push("JSS 3");
        if (data.classNaming.match("SSS 1") && !arr.includes("SSS 1"))
          arr.push("SSS 1");
        if (data.classNaming.match("SSS 2") && !arr.includes("SSS 2"))
          arr.push("SSS 2");
        if (data.classNaming.match("SSS 3") && !arr.includes("SSS 3"))
          arr.push("SSS 3");
      });
      res.status(200).json({ pioneerClass: pioneerClass, arr: arr });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};
// get student screening school
export const getStudentScreenPioneer = async (req, res) => {
  try {
    if (req.query.schoolStudentSelected) {
      const studentScreeningSchool = await PioneerNigerClass.find({
        pioneerIdNum: req.query.schoolStudentSelected,
      });
      if (studentScreeningSchool.length > 0) {
        res.status(200).send(studentScreeningSchool);
      }
    }
  } catch (error) {
    res.status(401).send(error);
  }
};
// get student pioneer admitted class
// get student pioneer admitted class
export const studentSpecificClass = async (req, res) => {
  try {
    const { pioneerId, studentClass } = req.query;
    const getClass = await PioneerNigerClass.findOne({
      pioneerIdNum: pioneerId,
      classNaming: studentClass,
    });
    if (getClass) {
      res.status(200).send(getClass);
    }
  } catch (error) {
    res.status(401).send(error);
  }
};
// get student pioneer admitted class
// get student pioneer admitted class
export const studentSpecificTimetable = async (req, res) => {
  try {
    const { pioneerId, studentClass } = req.query;
    // console.log(pioneerId, studentClass);
    const getClass = await NigerTimetable.findOne({
      pioneerId: pioneerId,
      className: studentClass,
    });
    if (getClass) {
      res.status(200).send(getClass);
    }
  } catch (error) {
    res.status(401).send(error);
  }
};
// get defaultClasses class Get method
// get defaultClasses class Get method
export const getDefaultClasses = async (req, res) => {
  try {
    const oldClasses = await NigerianClass.find();
    res.status(200).json(oldClasses);
  } catch (error) {
    res.send(error);
  }
};
// nigerClass timetable
// nigerClass timetable
export const nigerTimetable = async (req, res) => {
  try {
    const { className, pioneerId } = req.body;
    if (className === "JSS 1A") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "JSS 1A", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "JSS 1B") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "JSS 1B", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "JSS 1C") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "JSS 1C", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "JSS 1D") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "JSS 1D", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "JSS 2A") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });

      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "JSS 2A", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "JSS 2B") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "JSS 2B", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "JSS 2C") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "JSS 2C", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "JSS 2D") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "JSS 2D", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "JSS 3A") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "JSS 3A", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "JSS 3B") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "JSS 3B", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "JSS 3C") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "JSS 3C", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "JSS 3D") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "JSS 3D", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "SSS 1A") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "SSS 1A", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "SSS 1B") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "SSS 1B", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "SSS 1C") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "SSS 1C", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "SSS 1D") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "SSS 1D", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "SSS 2A") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "SSS 2A", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "SSS 2B") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "SSS 2B", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "SSS 2C") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "SSS 2C", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "SSS 2D") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "SSS 2D", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "SSS 3A") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "SSS 3A", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "SSS 3B") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "SSS 3B", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "SSS 3C") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "SSS 3C", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
    if (className === "SSS 3D") {
      const { monday, tuesday, wednesday, thursday, friday } = req.body;
      const checks = await NigerTimetable.find({
        pioneerId: pioneerId,
        className: className,
      });
      if (checks.length === 0) {
        const timetable = new NigerTimetable(req.body);
        await timetable.save();
        res.status(200).json({ timetable: timetable });
      }
      if (checks.length >= 1) {
        await NigerTimetable.findOneAndUpdate(
          { className: "SSS 3D", pioneerId: pioneerId },
          {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
          },
          { new: true }
        )
          .then((data) => {
            res.status(200).json({ data: data });
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    }
  } catch (error) {
    res.status(401).send(error);
  }
};
// get timetable
// get timetable
export const getTimetable = async (req, res) => {
  try {
    const { _id, showTimetable, showSubjects } = req.query;
    if (showTimetable.length === 6) {
      const table = await NigerTimetable.find({
        pioneerId: _id,
        className: showTimetable,
      });
      if (Object.values({ table }).length >= 1) {
        res.status(200).json(table);
      }
    }
    if (showSubjects.length === 6) {
      const table = await NigerTimetable.find({
        pioneerId: _id,
        className: showSubjects,
      });
      if (Object.values({ table }).length >= 1) {
        res.status(200).json(table);
      }
    }
  } catch (error) {
    res.status(401).send(error);
  }
};
// reg student Post method
// reg student Post method
export const regStudent = async (req, res) => {
  try {
    const user = await Student.findOne({ studentEmail: req.body.studentEmail });
    if (user) {
      console.log("enter");
      throw new Error("Student already exist");
    }
    const student = new Student(req.body);
    const salt = await bcrypt.genSalt(10);
    student.studentPassword = await bcrypt.hash(student.studentPassword, salt);
    await student.save();
    const { studentFirstName, studentLastName, studentClass, pioneerId, _id } =
      student;
    const cover = {
      studentFirstName: studentFirstName,
      studentLasName: studentLastName,
      studentClass: studentClass,
      pioneerId: pioneerId,
      _id: _id,
    };
    res.status(201).json({
      cover,
      token: genAuthToken(student._id),
    });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized student" });
  }
};
// give student class
// give student class
export const studentAdmittedClass = async (req, res) => {
  // console.log("try");
  // console.log(req.body);
  try {
    const { pioneerId, studentId, studentClass } = req.body;
    // console.log("hello", pioneerId, studentId, studentClass);
    const checkPioneer = await Pioneer.find({
      pioneerId: pioneerId,
    });
    if (checkPioneer) {
      await Student.findOneAndUpdate(
        { _id: studentId },
        { pioneerId: pioneerId, studentClass: studentClass },
        { new: true }
      )
        .then((data) => {
          const values = {
            studentId: data._id,
            studentFirstName: data.studentFirstName,
            studentLastName: data.studentLastName,
            studentClass: data.studentClass,
            pioneerId: data.pioneerId,
          };
          res.status(200).send(values);
        })
        .catch((error) => {
          res.status(401).send(error);
        });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};
// reg teacher Post method
// reg teacher Post method
export const regTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.find({ email: req.body.email });
    if (teacher) {
      return res.json({ message: "Teacher already exist" });
    }
  } catch (err) {
    console.log(err);
  }
};
// reg non student Post method
// reg non student Post method
export const regNonStudent = async (req, res) => {
  try {
    const student = await NonStudent.find({ email: req.body.find });
    if (student) {
      return res.json({ message: "Student already exists" });
    }
  } catch (err) {
    console.log(err);
  }
};

// login student
// login student
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.query;
    const find = await Student.findOne({
      studentEmail: email,
    });
    const decipher = await bcrypt.compare(password, find.studentPassword);
    if (decipher === true) {
      const info = {
        pioneerId: find.pioneerId,
        studentClass: find.studentClass,
        studentFirstName: find.studentFirstName,
        studentId: find._id,
        studentLastName: find.studentLastName,
      };
      res.status(200).send(info);
    }
    if (decipher === false) {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

// login pioneer
// login pioneer
export const loginPioneer = async (req, res) => {
  try {
    console.log(req.query);
    const { email, password } = req.query;
    const find = await Pioneer.findOne({
      email: email,
    });
    const decipher = await bcrypt.compare(password, find.password);
    if (decipher === true) {
      const info = {
        _id: find._id,
        email: find.email,
        firstName: find.firstName,
        lastName: find.lastName,
        phoneNumber: find.phoneNumber,
        schoolName: find.schoolName,
      };
      res.status(200).send(info);
    }
    if (decipher === false) {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

// getStudentForPioneerNow
// getStudentForPioneerNow
export const getStudentForPioneerNow = async (req, res) => {
  try {
    const { pioneerId, classSelected } = req.query;
    if (pioneerId && classSelected.length === 6) {
      const students = await Student.find({
        pioneerId: pioneerId,
        studentClass: classSelected,
      });
      if (students) {
        res.status(200).send(students);
      }
    }
    if (pioneerId && classSelected.length !== 6) {
      const students = await Student.find({
        pioneerId: pioneerId,
      });
      if (students) {
        res.status(200).send(students);
      }
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

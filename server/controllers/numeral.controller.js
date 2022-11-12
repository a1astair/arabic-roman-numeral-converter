import mongoose from "mongoose";
import { convertToArabic, convertToRoman, checkIfRomanNumeral } from "../utils/index.js";
import { Numeral } from "../models/numeral.server.model.js";

export const getNumerals = (req, res) => {
  Numeral.find().exec((err, numerals) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error on Retrieving Numbers",
      });
    }
    if (numerals && numerals.length > 0) {
      return res.json({
        success: true,
        message: "Previous Numerals Fetched successfully",
        numerals,
      });
    } else {
      return res.json({
        success: true,
        message: "No Numerals",
      });
    }
  });
};

export const convertNumeral = (req, res) => {
  if (!req.body || !req.body.convertTo || !req.body.numeral) {
    return res.json({
      success: false,
      message: "Invalid post body, please try again",
    });
  }

  //Check if arabic -> roman or roman -> arabic
  const originalNumeral = req.body.numeral;
  if (req.body.convertTo === "arabic") {
    if (!checkIfRomanNumeral(originalNumeral)) {
      return res.json({
        success: false,
        message: "Error, not a valid Roman numeral, please try again",
      });
    }
    const arabicNumeral = convertToArabic(originalNumeral);
    if (arabicNumeral <= 0) {
      return res.json({
        success: false,
        message: "Error, not a number, please try again",
      });
    }
    const newNumeral = new Numeral({
      arabicNumeral: arabicNumeral,
      romanNumeral: originalNumeral,
    });
    newNumeral.save();
    return res.json({
      success: true,
      message: "Success! Converted to Arabic",
      answer: arabicNumeral,
    });
  }
  if (req.body.convertTo === "roman") {
    let num = parseInt(originalNumeral);
    if (isNaN(num)) {
      return res.json({
        success: false,
        message: "Error, not a number, please try again",
      });
    }
    if (num > 3999999 || num <= 0) {
      return res.json({
        success: false,
        message:
          "Error, number must be above 0 and below 3999999, please try again",
      });
    } else {
      const romanNumeral = convertToRoman(originalNumeral);
      const newNumeral = new Numeral({
        arabicNumeral: originalNumeral,
        romanNumeral: romanNumeral,
      });

      newNumeral.save();
      return res.json({
        success: true,
        message: "Success! Converted to Roman",
        answer: romanNumeral,
      });
    }
  }
  return res.json({
    success: false,
    message: "Invalid Convert-to value, please try again",
  });
};

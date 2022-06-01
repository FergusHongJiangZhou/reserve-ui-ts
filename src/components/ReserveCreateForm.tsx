import React, { useState } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Box,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Reserve.module.css";
import { reserve } from "../features/reserve/reserveAPI";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchAllReservations } from "../features/reserve/reserveSlice";

interface IReserveCreateForm {
  onClose: any;
}

function ReserveForm(props: IReserveCreateForm) {
  const { onClose } = props;
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem("userId") || "";
  const maxTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 7);
  const minTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const [size, setSize] = useState(2);
  const [startDate, setStartDate] = useState(minTime);
  const isSizeError = size === 0;
  const isDateError = startDate === null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (size && userId && startDate) {
      await reserve(size, userId, startDate);
    }
    dispatch(fetchAllReservations());
    onClose();
  };
  const isButtonDisabled = !size && !startDate;
  return (
    <Box>
      <form>
        <Stack spacing="2">
          <FormControl isRequired isInvalid={isSizeError}>
            <FormLabel htmlFor="size">Table Size</FormLabel>

            <NumberInput
              id="size"
              defaultValue={2}
              min={1}
              max={20}
              bgColor="gray.50"
              placeholder="Please input table size"
              onChange={(valueString) => setSize(Number(valueString))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {isSizeError && (
              <FormErrorMessage>Table size is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={isDateError}>
            <FormLabel htmlFor="reservedTime">Reserved Time</FormLabel>
            <DatePicker
              id="reservedTime"
              wrapperClassName={style.datePicker}
              selected={startDate}
              minDate={minTime}
              maxDate={maxTime}
              showTimeSelect={true}
              onChange={(date: Date) => setStartDate(date)}
            />
            {isDateError && (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
          </FormControl>
          <Button
            _hover={{ bgColor: "tomato" }}
            w="100%"
            colorScheme="teal"
            isDisabled={isButtonDisabled}
            onClick={handleSubmit}
          >
            Reserve
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default ReserveForm;

import React, { useState, useEffect } from "react";
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
  Select,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Reserve.module.css";
import { update } from "../features/reserve/reserveAPI";
import {
  reservationData,
  fetchAllReservations,
  fetchReservation,
} from "../features/reserve/reserveSlice";
import { userData } from "../features/user/userSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";

interface IReserveForm {
  id: string;
  onClose: any;
}

function ReserveForm(props: IReserveForm) {
  const { id, onClose } = props;
  const { reservation, reservationStatus } = useAppSelector(reservationData);
  const { user } = useAppSelector(userData);
  const dispatch = useAppDispatch();
  const maxTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 7);
  const minTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const [size, setSize] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(fetchReservation(id));
  }, [id]);

  useEffect(() => {
    setSize(reservation.size);
    setStartDate(reservation.reservedAt);
    setStatus(reservation.status);
  }, [reservation]);

  const isSizeError = size === 0;
  const isDateError = startDate === null;

  const handleStatus = (e: any) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (id && size && status && startDate) {
      await update(id, size, status, startDate);
    }
    dispatch(fetchAllReservations());
    onClose();
  };
  const isButtonDisabled = !size && !startDate;
  return (
    <>
      {reservationStatus === "idle" && (
        <Box>
          <form>
            <Stack spacing="2">
              <FormControl isRequired isInvalid={isSizeError}>
                <FormLabel htmlFor="size">Table Size</FormLabel>

                <NumberInput
                  id="size"
                  min={1}
                  max={20}
                  bgColor="gray.50"
                  value={size}
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
              <FormControl isRequired>
                <FormLabel htmlFor="reservedTime">Status</FormLabel>
                <Select bgColor="white" value={status} onChange={handleStatus}>
                  <option value="active">Active</option>
                  <option value="cancel">Cancel</option>
                  <option value="complete">Complete</option>
                </Select>
              </FormControl>
              {user.role === "admin" && (
                <Box>
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    {`Reserved By`}
                  </Box>
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    ml="2"
                  >
                    {`NAME: ${reservation.user?.name}`}
                  </Box>
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    ml="2"
                  >
                    {`PHONE: ${reservation.user?.phone}`}
                  </Box>
                </Box>
              )}

              <Button
                _hover={{ bgColor: "tomato" }}
                w="30%"
                float="right"
                colorScheme="teal"
                isDisabled={isButtonDisabled}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      )}
    </>
  );
}

export default ReserveForm;

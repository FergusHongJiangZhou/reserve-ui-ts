import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
  Heading,
  useDisclosure,
  chakra,
} from "@chakra-ui/react";
import {
  reservationData,
  fetchAllReservations,
} from "../features/reserve/reserveSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import ReserveEditForm from "./ReserveEditForm";
import ReserveCreateForm from "./ReserveCreateForm";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy, Column } from 'react-table'

interface ReservationsTableObject {
  name: string;
  size: number;
  time: string;
  status: 'active' | 'cancel' | 'complete';
}

function Reservations() {
  const [reservationId, setReservationId] = useState("");
  const { reservations, reservationsStatus, reservation, reservationStatus } =
    useAppSelector(reservationData);
  const [reservationList, setReservationList] = useState(reservations);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllReservations());
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const handleOpen = (id: string) => {
    setReservationId(id);
    onOpen();
  };
  useEffect(()=>{
    setReservationList(reservations);
  }, [reservations]);

  const data = React.useMemo(
    () => reservationList.map(reservation=> {
      return {
        id: reservation.id,
        name: reservation.user.name,
        size: reservation.size,
        time: reservation.reservedAt.toLocaleString(),
        status: reservation.status
      }
    }),
    [reservationList],
  )

  const columns: Column<ReservationsTableObject>[] = React.useMemo(
    () => [
      {
        Header: 'Reserved by',
        accessor: 'name',
      },
      {
        Header: 'Table size',
        accessor: 'size',
      },
      {
        Header: 'Reserved Time',
        accessor: 'time',
      },
      {
        Header: 'Reservation Status',
        accessor: 'status',
      },
    ],
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<ReservationsTableObject>({ columns, data }, useSortBy)

  return (
    <Box
      w="80%"
      mx="auto"
      mt="80px"
      bgColor="gray.200"
      p={3}
      boxShadow="lg"
      borderRadius="lg"
    >
      <Flex direction="row" align="center" justify="center" my="4">
        <Heading size="lg">Reservations</Heading>
      </Flex>
      <TableContainer>
      <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup: any) => (
          <Tr {...headerGroup.getHeaderGroupProps()} >
            {headerGroup.headers.map((column: any) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {column.render('Header')}
                <chakra.span pl='4'>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label='sorted descending' />
                    ) : (
                      <TriangleUpIcon aria-label='sorted ascending' />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row)
          return (
            <Tr {...row.getRowProps()} _hover={{ bgColor: "gray.300", cursor: "pointer" }} onClick={() => handleOpen(row.original.id)}>
              {row.cells.map((cell: any) => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
      </TableContainer>
      <Button
        _hover={{ bgColor: "tomato" }}
        w="30%"
        colorScheme="teal"
        onClick={onCreateOpen}
      >
        Reserve New One
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Reservation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReserveEditForm id={reservationId} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Reservation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReserveCreateForm onClose={onCreateClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Reservations;

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Flex,
  TableContainer,
  Input,
  Box, Text, Spinner, Stack, Button, Td
} from '@chakra-ui/react'
import { AddIcon, CheckIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useEffect, useState } from 'react';

interface AdminTableProps {
  table_caption: string;
  data: any[];
  headers: string[];
  handleAdd: (row: any) => void;
  handleDelete: (id: number) => void;
  handleUpdate: (id: number, row: any) => void;
}

interface RowData {
  [key: string]: any;
}

function AdminTable({ table_caption, data, headers, handleAdd, handleDelete, handleUpdate }: AdminTableProps) {
  const [showAddRow, setShowAddRow] = useState(false);
  const [newRow, setNewRow] = useState<RowData>({});
  const [editing, setEditing] = useState<RowData>({});
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  }

  const rowsPerPage = 15;
  const offset = currentPage * rowsPerPage;

  const currentPageData = data.slice(offset, offset + rowsPerPage);

  const pageCount = Math.ceil(data.length / rowsPerPage);

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  useEffect(() => {
    setIsLoading(true);
    if (data) setIsLoading(false);
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setNewRow({ ...newRow, [key]: e.target.value });
  };

  const handleEditingChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setEditing({ ...editing, [key]: e.target.value });
  };

  const filteredHeaders = headers.filter(header => !['is_deleted', 'rents'].includes(header));

  const format = (s: string) => {
    if (typeof s !== 'string') return '';
    const withoutSpaces = s.replace(/\s+/g, '');
    const withSpaces = withoutSpaces.replace(/_/g, ' ');
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  }

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" overflow="auto">
        <TableContainer width={"100%"} maxHeight={"100vh"} overflow={"auto"}>
          <Text fontSize="md" fontWeight="bold" textAlign="left" p={2}>{table_caption}</Text>
          {isLoading ? (
            <Box position="fixed" top="0" right="0" bottom="0" left="0" display="flex" alignItems="center" justifyContent="center">
              <Spinner color="green.500" />
            </Box>
          ) : (
            <Table variant='simple' size="sm">
              <Thead>
                <Tr>
                  {filteredHeaders.map((header, index) => (
                    <Th key={index} fontSize="xs">{format(header)}</Th>
                  ))}
                  <Th fontSize="xs"></Th>
                  <Th fontSize="xs"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentPageData.length === 0 && !showAddRow && (
                  <Tr>
                    {filteredHeaders.map((header, index) => (
                      <Td key={index} fontSize="xs">
                        <Input
                          placeholder={format(header)}
                          value={newRow[header] || ''}
                          onChange={(e) => handleInputChange(e, header)}
                          size="sm"
                        />
                      </Td>
                    ))}
                    <Td fontSize="xs">
                      {isAdding ? (
                        <CheckIcon onClick={() => {
                          if (Object.values(newRow).every(value => value !== '')) {
                            handleAdd(newRow);
                            setNewRow({});
                            setIsAdding(false);
                          }
                        }} />
                      ) : (
                        <AddIcon onClick={() => setIsAdding(true)} />
                      )}
                    </Td>
                  </Tr>
                )}
                {currentPageData.map((row, index) => (
                  <Tr key={index}>
                    {filteredHeaders.map((header, index) => (
                      <Td key={index} fontSize="xs" style={header === 'image_url' ? { maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } : {}}>
                        {editingRowId === row.id_ ? (
                          <Input
                            value={editing[header] || ''}
                            onChange={(e) => handleEditingChange(e, header)}
                            size="sm"
                          />
                        ) : (
                          <span onClick={() => { setEditingRowId(row.id_); setEditing({ ...row }); }}>
                            {row[header]}
                          </span>
                        )}
                      </Td>
                    ))}
                    <Td fontSize="xs">
                      <DeleteIcon onClick={() => handleDelete(row.id_)} />
                      <RepeatIcon onClick={() => { handleUpdate(row.id_, editing); setEditing({}); setEditingRowId(null); }} />
                    </Td>
                    <Td fontSize="xs">
                      {index === currentPageData.length - 1 && !showAddRow && <AddIcon onClick={() => setShowAddRow(true)} />}
                    </Td>
                  </Tr>
                ))}
                {showAddRow && (
                  <Tr>
                    {filteredHeaders.map((header, index) => (
                      <Td key={index} fontSize="xs">
                        <Input
                          placeholder={format(header)}
                          value={newRow[header] || ''}
                          onChange={(e) => handleInputChange(e, header)}
                          size="sm"
                        />
                      </Td>
                    ))}
                    <Td fontSize="xs">
                      <CheckIcon onClick={() => {
                        if (Object.values(newRow).every(value => value !== '')) {
                          handleAdd(newRow);
                          setShowAddRow(false);
                          setNewRow({});
                        }
                      }} />
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          )}
          {data.length > 0 && pageCount > 1 && (
            <Flex wrap="wrap" justifyContent="center" mt={4}>
              <Stack direction={{ base: "row", md: "row" }} spacing={2}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageClick(page - 1)}
                    colorScheme={page === currentPage + 1 ? "green" : "gray"}
                  >
                    {page}
                  </Button>
                ))}
              </Stack>
            </Flex>
          )}
        </TableContainer>
      </Box>
    </>
  )
}

export default AdminTable;

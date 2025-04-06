import { Card, Checkbox, MultiSelect, Slider, Stack, Title } from "@mantine/core";

export default function FilterSidebar({ filters, setFilters }) {
  return (
    <Card withBorder p={"md"} radius={"md"}>

    <Stack gap="md">
      <Title order={5}>Filter your product</Title>

      <MultiSelect
        label="Product"
        data={["Air Max", "Air Jordan 1", "Dunk"]}
        value={filters.category}
        onChange={(value) => setFilters({ ...filters, category: value })}
      />

      <Slider
        label="Label"
        min={0}
        max={100}
        value={filters.price}
        onChange={(value) => setFilters({ ...filters, price: value })}
        marks={[
          { value: 0, label: "$0" },
          { value: 100, label: "$100" },
        ]}
      />

      <Checkbox.Group
        label="Color"
        value={filters.color}
        onChange={(value) => setFilters({ ...filters, color: value })}
      >
        <Stack>
          <Checkbox value="black" label="black" />
          <Checkbox value="white" label="white" />
          <Checkbox value="green" label="green" />
        </Stack>
      </Checkbox.Group>

      <Checkbox.Group
        label="Size"
        value={filters.size}
        onChange={(value) => setFilters({ ...filters, size: value })}
      >
        <Stack>
          <Checkbox value="10" label="10" />
          <Checkbox value="9.5" label="9.5" />
          <Checkbox value="8" label="8" />
        </Stack>
      </Checkbox.Group>
    </Stack>
    </Card>

  );
}

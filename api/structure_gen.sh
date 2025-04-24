#!/bin/bash

# 使い方: ./structure_gen.sh <resourceName>
# 例: ./structure_gen.sh users

if [ -z "$1" ]; then
  echo "Usage: $0 <resourceName>"
  exit 1
fi

# 入力されたリソース名（例: users, user, posts など）
NAME="$1"

# もし NAME が大文字混じりの場合、すべて小文字に変換してディレクトリ名とします
name_lower=$(echo "$NAME" | tr '[:upper:]' '[:lower:]')

# 最後の文字が "s" かどうかで、単数形と複数形を決定する
last_char="${NAME: -1}"
if [ "$last_char" = "s" ] || [ "$last_char" = "S" ]; then
    # 引数が複数形の場合、単数形は末尾の1文字を除く
    SINGULAR_NAME=$(echo "$NAME" | sed 's/.$//')
    PLURAL_NAME="$NAME"
else
    SINGULAR_NAME="$NAME"
    PLURAL_NAME="${NAME}s"
fi

# クラス名は先頭大文字に統一
SINGULAR_NAME="$(tr '[:lower:]' '[:upper:]' <<< ${SINGULAR_NAME:0:1})${SINGULAR_NAME:1}"
PLURAL_NAME="$(tr '[:lower:]' '[:upper:]' <<< ${PLURAL_NAME:0:1})${PLURAL_NAME:1}"

# ファイル名用は小文字（例: user, users）
singular_lower=$(echo "$SINGULAR_NAME" | tr '[:upper:]' '[:lower:]')
plural_lower=$(echo "$PLURAL_NAME" | tr '[:upper:]' '[:lower:]')

# ディレクトリ作成 (例: src/users/dto, src/users/entities, src/users/mappers)
mkdir -p src/$plural_lower/dto
mkdir -p src/$plural_lower/entities
mkdir -p src/$plural_lower/mappers

### DTO (リクエスト)
cat > src/$plural_lower/dto/${singular_lower}-request.dto.ts <<EOF
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger'

export class Create${SINGULAR_NAME}RequestDto { }

export class Update${SINGULAR_NAME}RequestDto extends PartialType(Create${SINGULAR_NAME}RequestDto) { }
EOF

### DTO (レスポンス)
cat > src/$plural_lower/dto/${singular_lower}-response.dto.ts <<EOF
import { ApiProperty } from '@nestjs/swagger'

export class Get${SINGULAR_NAME}ResponseDto { }

export class Create${SINGULAR_NAME}ResponseDto { }

export class Update${SINGULAR_NAME}ResponseDto { }

export class Delete${SINGULAR_NAME}ResponseDto { }
EOF

### Entity
cat > src/$plural_lower/entities/${singular_lower}.entity.ts <<EOF
export class ${SINGULAR_NAME} {
    constructor( ) { }

    static fromSupabase(data: any): ${SINGULAR_NAME} {
        return new ${SINGULAR_NAME}()
    }
}
EOF

### Mapper
cat > src/$plural_lower/mappers/${singular_lower}.mapper.ts <<EOF
import { Create${SINGULAR_NAME}RequestDto } from 'src/${plural_lower}/dto/${singular_lower}-request.dto'
import { ${SINGULAR_NAME} } from '../entities/${singular_lower}.entity'
import { Get${SINGULAR_NAME}ResponseDto } from 'src/${plural_lower}/dto/${singular_lower}-response.dto'

export class ${SINGULAR_NAME}Mapper {
    static toEntity(dto: Create${SINGULAR_NAME}RequestDto): ${SINGULAR_NAME} {
        return new ${SINGULAR_NAME}()
    }

    static toGetResponse(entity: ${SINGULAR_NAME}): Get${SINGULAR_NAME}ResponseDto {
        return {
        }
    }

    static toGetResponseArray(entities: ${SINGULAR_NAME}[]): Get${SINGULAR_NAME}ResponseDto[] {
        return entities.map(this.toGetResponse)
    }
}
EOF

### Controller
cat > src/$plural_lower/${plural_lower}.controller.ts <<EOF
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete
} from '@nestjs/common'
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiOperation
} from '@nestjs/swagger'
import { ${PLURAL_NAME}Service } from './${plural_lower}.service'
import { Create${SINGULAR_NAME}ResponseDto, Delete${SINGULAR_NAME}ResponseDto, Get${SINGULAR_NAME}ResponseDto, Update${SINGULAR_NAME}ResponseDto } from './dto/${singular_lower}-response.dto'
import { Create${SINGULAR_NAME}RequestDto, Update${SINGULAR_NAME}RequestDto } from './dto/${singular_lower}-request.dto'

@ApiTags('${plural_lower}')
@Controller('${plural_lower}')
export class ${PLURAL_NAME}Controller {
  constructor(private readonly ${plural_lower}Service: ${PLURAL_NAME}Service) { }

  @Post()
  @ApiOperation({ summary: '${SINGULAR_NAME}の作成', description: '新しい${singular_lower}を登録します。' })
  @ApiBody({ type: Create${SINGULAR_NAME}RequestDto })
  @ApiCreatedResponse({ type: Create${SINGULAR_NAME}ResponseDto })
  async create(@Body() dto: Create${SINGULAR_NAME}RequestDto): Promise<Create${SINGULAR_NAME}ResponseDto> {
    const data = await this.${plural_lower}Service.create(dto)
    return {
    }
  }

  @Get()
  @ApiOperation({ summary: '${SINGULAR_NAME}一覧の取得', description: '登録されているすべての${singular_lower}情報を取得します。' })
  @ApiOkResponse({ type: [Get${SINGULAR_NAME}ResponseDto] })
  async findAll(): Promise<Get${SINGULAR_NAME}ResponseDto[]> {
    const data = await this.${plural_lower}Service.findAll()
    return data.map(d => ({
    }))
  }

  @Get(':id')
  @ApiOperation({ summary: '${SINGULAR_NAME}の取得', description: '特定の${singular_lower}情報を取得します。' })
  @ApiOkResponse({ type: Get${SINGULAR_NAME}ResponseDto })
  async findOne(@Param('id') id: string) {
    const data = await this.${plural_lower}Service.findOne(id);
    return {
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: '${SINGULAR_NAME}の更新', description: '${singular_lower}情報を更新します。' })
  @ApiBody({ type: Update${SINGULAR_NAME}RequestDto })
  @ApiOkResponse({ type: Update${SINGULAR_NAME}ResponseDto })
  async update(@Param('id') id: string, @Body() dto: Update${SINGULAR_NAME}RequestDto) {
    const data = await this.${plural_lower}Service.update(id, dto);
    return {
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '${SINGULAR_NAME}の削除', description: '${singular_lower}を削除します。' })
  @ApiOkResponse({ type: Delete${SINGULAR_NAME}ResponseDto })
  async remove(@Param('id') id: string) {
    const data = await this.${plural_lower}Service.remove(id);
    return {
    }
  }
}
EOF

### Service
cat > src/$plural_lower/${plural_lower}.service.ts <<EOF
import { Injectable } from '@nestjs/common'
import { ${PLURAL_NAME}Repository } from './${plural_lower}.repository'
import { Create${SINGULAR_NAME}RequestDto, Update${SINGULAR_NAME}RequestDto } from './dto/${singular_lower}-request.dto';

@Injectable()
export class ${PLURAL_NAME}Service {
  constructor(private readonly ${plural_lower}Repository: ${PLURAL_NAME}Repository) { }

  findAll() {
    return this.${plural_lower}Repository.findAll()
  }

  create(dto: Create${SINGULAR_NAME}RequestDto) {
    return this.${plural_lower}Repository.create(dto)
  }

  findOne(id: string) {
    return this.${plural_lower}Repository.findOne(id);
  }

  update(id: string, dto: Update${SINGULAR_NAME}RequestDto) {
    return this.${plural_lower}Repository.update(id, dto);
  }

  remove(id: string) {
    return this.${plural_lower}Repository.remove(id);
  }
}
EOF

### Repository
cat > src/$plural_lower/${plural_lower}.repository.ts <<EOF
import { Injectable } from '@nestjs/common'
import { ${SINGULAR_NAME} } from './entities/${singular_lower}.entity'
import { createSupabaseClient } from '../supabase.server'
import { Create${SINGULAR_NAME}RequestDto, Update${SINGULAR_NAME}RequestDto } from './dto/${singular_lower}-request.dto'

@Injectable()
export class ${PLURAL_NAME}Repository {
    private supabase = createSupabaseClient()

    async findAll(): Promise<${SINGULAR_NAME}[]> {
        const { data, error } = await this.supabase.rpc('get_all_${singular_lower}s')
        if (error) throw error
        return data.map(${SINGULAR_NAME}.fromSupabase)
    }

    async create(dto: Create${SINGULAR_NAME}RequestDto): Promise<${SINGULAR_NAME}> {
        const { data, error } = await this.supabase.rpc('create_${singular_lower}', {
        })
        if (error) throw error
        return ${SINGULAR_NAME}.fromSupabase(data)
    }

    async findOne(id: string): Promise<${SINGULAR_NAME}> {
        const { data, error } = await this.supabase.rpc('get_${singular_lower}', {
            id: id
        })
        if (error) throw error
        return ${SINGULAR_NAME}.fromSupabase(data)
    }

    async update(id: string, dto: Update${SINGULAR_NAME}RequestDto): Promise<${SINGULAR_NAME}> {
        const { data, error } = await this.supabase.rpc('update_${singular_lower}', {
            id: id,
        })
        if (error) throw error
        return ${SINGULAR_NAME}.fromSupabase(data)
    }

    async remove(id: string): Promise<${SINGULAR_NAME}> {
        const { data, error } = await this.supabase.rpc('remove_${singular_lower}', {
            id: id
        })
        if (error) throw error
        return ${SINGULAR_NAME}.fromSupabase(data)
    }
}
EOF

### Module
cat > src/$plural_lower/${plural_lower}.module.ts <<EOF
import { Module } from '@nestjs/common';
import { ${PLURAL_NAME}Service } from './${plural_lower}.service';
import { ${PLURAL_NAME}Controller } from './${plural_lower}.controller';
import { ${PLURAL_NAME}Repository } from './${plural_lower}.repository';

@Module({
  controllers: [${PLURAL_NAME}Controller],
  providers: [${PLURAL_NAME}Service, ${PLURAL_NAME}Repository],
})
export class ${PLURAL_NAME}Module { }
EOF

### Index
APP_MODULE_PATH="src/app.module.ts"
IMPORT_STATEMENT="import { ${PLURAL_NAME}Module } from './${plural_lower}/${plural_lower}.module';"

# import 文がまだ含まれていなければ追加
if ! grep -q "$IMPORT_STATEMENT" "$APP_MODULE_PATH"; then
  awk -v new_import="$IMPORT_STATEMENT" '
    BEGIN { added=0 }
    /^import / { print; next }
    !added { print new_import; added=1 }
    { print }
  ' "$APP_MODULE_PATH" > tmp && mv tmp "$APP_MODULE_PATH"
fi
# @Module の imports: [ ] に追加（まだ含まれていなければ）
sed -i "/imports: \[/ s/\[/[${PLURAL_NAME}Module, /" "$APP_MODULE_PATH"


echo "✅ Generated complete structure for ${PLURAL_NAME}"
